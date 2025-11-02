import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../services/email.service';
import { SmsService } from '../services/sms.service';
import { Enable2FADto, Verify2FADto, Disable2FADto } from './dto/two-factor.dto';

@Injectable()
export class TwoFactorService {
  private readonly logger = new Logger(TwoFactorService.name);

  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private emailService: EmailService,
    private smsService: SmsService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async get2FAStatus(userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const backupCodes = user.twoFactorBackupCodes 
        ? (Array.isArray(user.twoFactorBackupCodes) 
            ? user.twoFactorBackupCodes 
            : JSON.parse(user.twoFactorBackupCodes as string))
        : [];

      return {
        enabled: user.twoFactorEnabled ?? false,
        method: user.twoFactorMethod as 'email' | 'sms' | null,
        backupCodesCount: Array.isArray(backupCodes) ? backupCodes.length : 0,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error('Error getting 2FA status:', error);
      throw new BadRequestException('Failed to get 2FA status');
    }
  }

  async enable2FA(userId: string, enable2FADto: Enable2FADto) {
    try {
      // Validate password first
      const user = await this.usersService.findByIdWithPassword(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.password) {
        throw new BadRequestException('Password authentication is required to enable 2FA');
      }

      const isPasswordValid = await bcrypt.compare(enable2FADto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      // Validate phone number if method is SMS
      if (enable2FADto.method === 'sms' && !enable2FADto.phone) {
        throw new BadRequestException('Phone number is required when using SMS method');
      }

      // Check if user already has 2FA enabled
      if (user.twoFactorEnabled) {
        throw new BadRequestException('2FA is already enabled for this account');
      }

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      // Update user with 2FA settings
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: true,
          twoFactorMethod: enable2FADto.method,
          twoFactorBackupCodes: backupCodes as any, // Store as JSON
          // Update phone if method is SMS
          ...(enable2FADto.method === 'sms' && enable2FADto.phone && {
            phone: enable2FADto.phone,
          }),
        },
      });

      this.logger.log(`2FA enabled for user ${userId} using ${enable2FADto.method}`);

      return {
        message: `2FA has been enabled successfully using ${enable2FADto.method}. Please save your backup codes securely.`,
        backupCodes,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error enabling 2FA:', error);
      throw new BadRequestException('Failed to enable 2FA');
    }
  }

  async send2FACode(email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (!user.twoFactorEnabled) {
        throw new BadRequestException('2FA is not enabled for this account');
      }

      // Generate 6-digit code
      const code = this.generate2FACode();
      const codeExp = new Date();
      codeExp.setMinutes(codeExp.getMinutes() + 5); // 5 minute expiration

      // Save code to database
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorCode: code,
          twoFactorCodeExp: codeExp,
        },
      });

      // Send code via configured method
      if (user.twoFactorMethod === 'email') {
        await this.emailService.send2FAEmail(email, code);
      } else if (user.twoFactorMethod === 'sms' && user.phone) {
        await this.smsService.send2FACode(user.phone, code);
      } else {
        throw new BadRequestException('Invalid 2FA method configuration');
      }

      this.logger.log(`2FA code sent to ${email} via ${user.twoFactorMethod}`);

      return {
        message: `2FA code sent via ${user.twoFactorMethod}`,
        method: user.twoFactorMethod,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error sending 2FA code:', error);
      throw new BadRequestException('Failed to send 2FA code');
    }
  }

  async verify2FA(verify2FADto: Verify2FADto) {
    try {
      const user = await this.usersService.findByEmail(verify2FADto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!user.twoFactorEnabled) {
        throw new BadRequestException('2FA is not enabled for this account');
      }

      let isValidCode = false;

      // Parse backup codes if stored as JSON string
      let backupCodes: string[] = [];
      if (user.twoFactorBackupCodes) {
        if (Array.isArray(user.twoFactorBackupCodes)) {
          backupCodes = user.twoFactorBackupCodes.map(code => String(code));
        } else if (typeof user.twoFactorBackupCodes === 'string') {
          const parsed = JSON.parse(user.twoFactorBackupCodes);
          backupCodes = Array.isArray(parsed) ? parsed.map(code => String(code)) : [];
        }
      }

      // Check if it's a backup code
      if (backupCodes.length > 0) {
        const codeIndex = backupCodes.indexOf(verify2FADto.code.toUpperCase());
        
        if (codeIndex !== -1) {
          // Remove used backup code
          backupCodes.splice(codeIndex, 1);
          await this.prisma.user.update({
            where: { id: user.id },
            data: { twoFactorBackupCodes: backupCodes as any },
          });
          isValidCode = true;
          this.logger.log(`Backup code used for user ${user.email}`);
        }
      }

      // Check if it's a regular 2FA code
      if (!isValidCode) {
        if (!user.twoFactorCode || !user.twoFactorCodeExp) {
          throw new UnauthorizedException('No valid 2FA code found. Please request a new code.');
        }

        if (new Date() > user.twoFactorCodeExp) {
          throw new UnauthorizedException('2FA code has expired. Please request a new code.');
        }

        if (user.twoFactorCode !== verify2FADto.code) {
          throw new UnauthorizedException('Invalid 2FA code');
        }

        // Clear the used code
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            twoFactorCode: null,
            twoFactorCodeExp: null,
            lastLogin: new Date(),
          },
        });
        isValidCode = true;
      }

      if (!isValidCode) {
        throw new UnauthorizedException('Invalid 2FA code');
      }

      // Generate JWT token
      const payload = { 
        email: user.email, 
        sub: user.id,
        plan: user.plan 
      };
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error verifying 2FA:', error);
      throw new UnauthorizedException('2FA verification failed');
    }
  }

  async disable2FA(userId: string, disable2FADto: Disable2FADto) {
    try {
      // Validate password first
      const user = await this.usersService.findByIdWithPassword(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.password) {
        throw new BadRequestException('Password authentication is required to disable 2FA');
      }

      const isPasswordValid = await bcrypt.compare(disable2FADto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      // Check if 2FA is enabled
      if (!user.twoFactorEnabled) {
        throw new BadRequestException('2FA is not currently enabled');
      }

      // Disable 2FA
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: false,
          twoFactorMethod: null,
          twoFactorCode: null,
          twoFactorCodeExp: null,
          twoFactorBackupCodes: null,
        },
      });

      this.logger.log(`2FA disabled for user ${userId}`);

      return { message: '2FA has been disabled successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error disabling 2FA:', error);
      throw new BadRequestException('Failed to disable 2FA');
    }
  }

  async regenerateBackupCodes(userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.twoFactorEnabled) {
        throw new BadRequestException('2FA is not enabled for this account');
      }

      // Generate new backup codes
      const backupCodes = this.generateBackupCodes();

      // Update user with new backup codes
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorBackupCodes: backupCodes as any,
        },
      });

      this.logger.log(`Backup codes regenerated for user ${userId}`);

      return {
        message: 'Backup codes have been regenerated successfully. Please save them securely.',
        backupCodes,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error regenerating backup codes:', error);
      throw new BadRequestException('Failed to regenerate backup codes');
    }
  }

  private generate2FACode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateBackupCodes(): string[] {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(crypto.randomBytes(4).toString('hex').toUpperCase());
    }
    return codes;
  }
}
