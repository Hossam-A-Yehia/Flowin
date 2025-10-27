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
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Temporary: Return default values until schema is updated
      const twoFactorEnabled = (user as any).twoFactorEnabled || false;
      const twoFactorMethod = (user as any).twoFactorMethod || null;
      const twoFactorBackupCodes = (user as any).twoFactorBackupCodes || [];

      const backupCodesCount = Array.isArray(twoFactorBackupCodes) 
        ? twoFactorBackupCodes.length 
        : 0;

      return {
        enabled: twoFactorEnabled,
        method: twoFactorMethod,
        backupCodesCount,
      };
    } catch (error) {
      this.logger.error('Error getting 2FA status:', error);
      throw new BadRequestException('Failed to get 2FA status');
    }
  }

  async enable2FA(userId: string, enable2FADto: Enable2FADto) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.twoFactorEnabled) {
        throw new BadRequestException('2FA is already enabled for this account');
      }

      // Validate phone number if SMS method
      if (enable2FADto.method === 'sms') {
        if (!enable2FADto.phone) {
          throw new BadRequestException('Phone number is required for SMS 2FA');
        }
        if (!this.smsService.isValidPhoneNumber(enable2FADto.phone)) {
          throw new BadRequestException('Invalid phone number format');
        }
      }

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      // Update user with 2FA settings
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: true,
          twoFactorMethod: enable2FADto.method,
          phone: enable2FADto.method === 'sms' ? enable2FADto.phone : user.phone,
          twoFactorBackupCodes: backupCodes,
        },
      });

      this.logger.log(`2FA enabled for user ${user.email} using ${enable2FADto.method}`);

      return {
        message: `2FA enabled successfully using ${enable2FADto.method}`,
        backupCodes,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
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

      // Check if it's a backup code
      if (user.twoFactorBackupCodes && Array.isArray(user.twoFactorBackupCodes)) {
        const backupCodes = user.twoFactorBackupCodes as string[];
        const codeIndex = backupCodes.indexOf(verify2FADto.code);
        
        if (codeIndex !== -1) {
          // Remove used backup code
          backupCodes.splice(codeIndex, 1);
          await this.prisma.user.update({
            where: { id: user.id },
            data: { twoFactorBackupCodes: backupCodes },
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
      const user = await this.usersService.findByIdWithPassword(userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (!user.twoFactorEnabled) {
        throw new BadRequestException('2FA is not enabled for this account');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(disable2FADto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
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

      this.logger.log(`2FA disabled for user ${user.email}`);

      return { message: '2FA disabled successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) {
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
        throw new BadRequestException('User not found');
      }

      if (!user.twoFactorEnabled) {
        throw new BadRequestException('2FA is not enabled for this account');
      }

      // Generate new backup codes
      const backupCodes = this.generateBackupCodes();

      await this.prisma.user.update({
        where: { id: userId },
        data: { twoFactorBackupCodes: backupCodes },
      });

      this.logger.log(`Backup codes regenerated for user ${user.email}`);

      return {
        message: 'Backup codes regenerated successfully',
        backupCodes,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
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
