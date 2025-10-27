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
      // For now, return that 2FA is not enabled until schema is updated
      return {
        enabled: false,
        method: null,
        backupCodesCount: 0,
      };
    } catch (error) {
      this.logger.error('Error getting 2FA status:', error);
      throw new BadRequestException('Failed to get 2FA status');
    }
  }

  async enable2FA(userId: string, enable2FADto: Enable2FADto) {
    try {
      // For now, return a message that 2FA will be available after schema update
      return {
        message: '2FA feature will be available after database schema update. Please run: npx prisma generate && npx prisma db push',
        backupCodes: [],
      };
    } catch (error) {
      this.logger.error('Error enabling 2FA:', error);
      throw new BadRequestException('Failed to enable 2FA');
    }
  }

  async send2FACode(email: string) {
    try {
      // For now, return a message that 2FA will be available after schema update
      return {
        message: '2FA feature will be available after database schema update',
        method: 'email',
      };
    } catch (error) {
      this.logger.error('Error sending 2FA code:', error);
      throw new BadRequestException('Failed to send 2FA code');
    }
  }

  async verify2FA(verify2FADto: Verify2FADto) {
    try {
      // For now, return an error that 2FA is not yet available
      throw new BadRequestException('2FA feature will be available after database schema update');
    } catch (error) {
      this.logger.error('Error verifying 2FA:', error);
      throw new UnauthorizedException('2FA verification failed');
    }
  }

  async disable2FA(userId: string, disable2FADto: Disable2FADto) {
    try {
      // For now, return a message that 2FA is not enabled
      return { message: '2FA is not currently enabled' };
    } catch (error) {
      this.logger.error('Error disabling 2FA:', error);
      throw new BadRequestException('Failed to disable 2FA');
    }
  }

  async regenerateBackupCodes(userId: string) {
    try {
      // For now, return empty backup codes
      return {
        message: '2FA feature will be available after database schema update',
        backupCodes: [],
      };
    } catch (error) {
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
