import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class VerificationService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private config: ConfigService,
  ) {}

  // ================================
  // EMAIL VERIFICATION
  // ================================

  async sendEmailVerification(email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.emailVerified) {
        return { message: 'Email is already verified' };
      }

      // Generate verification token
      const verifyToken = crypto.randomBytes(32).toString('hex');
      const verifyExp = new Date();
      verifyExp.setHours(verifyExp.getHours() + 24); // 24 hour expiration

      // Save token to database
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerifyToken: verifyToken,
          emailVerifyExp: verifyExp,
        },
      });

      // TODO: Send verification email
      // For now, log the verification link in development
      if (process.env.NODE_ENV === 'development') {
        const verifyLink = `${this.config.get('FRONTEND_URL', 'http://localhost:3000')}/verify-email?token=${verifyToken}`;
        console.log(`📧 Email verification link for ${email}: ${verifyLink}`);
      }

      return { 
        message: 'Verification email sent. Please check your inbox and click the verification link.' 
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error sending email verification:', error);
      throw new BadRequestException('Failed to send verification email');
    }
  }

  async verifyEmail(token: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          emailVerifyToken: token,
          emailVerifyExp: {
            gt: new Date(), // Token must not be expired
          },
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid or expired verification token');
      }

      if (user.emailVerified) {
        return { message: 'Email is already verified' };
      }

      // Mark email as verified and clear token
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          emailVerifyToken: null,
          emailVerifyExp: null,
        },
      });

      return { message: 'Email verified successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error verifying email:', error);
      throw new BadRequestException('Failed to verify email');
    }
  }

  // ================================
  // PHONE VERIFICATION
  // ================================

  async sendPhoneVerification(phone: string, userId?: string) {
    try {
      let user;
      
      if (userId) {
        // For logged-in users adding/verifying phone
        user = await this.usersService.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found');
        }
      } else {
        // For phone verification during registration or standalone
        user = await this.prisma.user.findFirst({
          where: { phone },
        });
        if (!user) {
          throw new NotFoundException('No account found with this phone number');
        }
      }

      if (user.phoneVerified) {
        return { message: 'Phone number is already verified' };
      }

      // Generate 6-digit verification code
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const verifyExp = new Date();
      verifyExp.setMinutes(verifyExp.getMinutes() + 10); // 10 minute expiration

      // Save code to database
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          phone: phone, // Update phone if provided
          phoneVerifyCode: verifyCode,
          phoneVerifyExp: verifyExp,
        },
      });

      // TODO: Send SMS with verification code
      // For now, log the code in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`📱 SMS verification code for ${phone}: ${verifyCode}`);
      }

      return { 
        message: 'Verification code sent to your phone. Please enter the 6-digit code.' 
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error sending phone verification:', error);
      throw new BadRequestException('Failed to send verification code');
    }
  }

  async verifyPhone(phone: string, code: string, userId?: string) {
    try {
      let user;

      if (userId) {
        // For logged-in users
        user = await this.prisma.user.findFirst({
          where: { 
            id: userId,
            phone: phone,
          },
        });
      } else {
        // For standalone verification
        user = await this.prisma.user.findFirst({
          where: { phone },
        });
      }

      if (!user) {
        throw new NotFoundException('User not found or phone number mismatch');
      }

      if (user.phoneVerified) {
        return { message: 'Phone number is already verified' };
      }

      // Check code and expiration
      if (!user.phoneVerifyCode || user.phoneVerifyCode !== code) {
        throw new BadRequestException('Invalid verification code');
      }

      if (!user.phoneVerifyExp || user.phoneVerifyExp < new Date()) {
        throw new BadRequestException('Verification code has expired');
      }

      // Mark phone as verified and clear code
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          phoneVerified: new Date(),
          phoneVerifyCode: null,
          phoneVerifyExp: null,
        },
      });

      return { message: 'Phone number verified successfully' };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error verifying phone:', error);
      throw new BadRequestException('Failed to verify phone number');
    }
  }

  // ================================
  // UTILITY METHODS
  // ================================

  async resendVerification(type: 'email' | 'phone', userId: string, contact?: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (type === 'email') {
        const email = contact || user.email;
        return this.sendEmailVerification(email);
      } else if (type === 'phone') {
        const phone = contact || user.phone;
        if (!phone) {
          throw new BadRequestException('No phone number found for this user');
        }
        return this.sendPhoneVerification(phone, userId);
      }

      throw new BadRequestException('Invalid verification type');
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error resending verification:', error);
      throw new BadRequestException('Failed to resend verification');
    }
  }

  async getVerificationStatus(userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        email: {
          verified: !!user.emailVerified,
          verifiedAt: user.emailVerified,
        },
        phone: {
          number: user.phone,
          verified: !!user.phoneVerified,
          verifiedAt: user.phoneVerified,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error getting verification status:', error);
      throw new BadRequestException('Failed to get verification status');
    }
  }
}
