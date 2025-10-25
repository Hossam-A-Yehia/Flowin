import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  async login(user: any) {
    try {
      const payload = { 
        email: user.email, 
        sub: user.id,
        plan: user.plan 
      };
      
      // Update last login timestamp
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
          createdAt: user.createdAt,
        },
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw new UnauthorizedException('Login failed');
    }
  }

  async register(email: string, password: string, name?: string) {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Validate email format (additional check)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new BadRequestException('Invalid email format');
      }

      // Hash password
      const saltRounds = parseInt(this.config.get('BCRYPT_SALT_ROUNDS', '12'));
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await this.usersService.create({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name?.trim(),
      });

      // Return login response
      return this.login(user);
    } catch (error) {
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error during registration:', error);
      throw new BadRequestException('Registration failed');
    }
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
      const user = await this.usersService.findByIdWithPassword(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      const saltRounds = parseInt(this.config.get('BCRYPT_SALT_ROUNDS', '12'));
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return { message: 'Password changed successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Error changing password:', error);
      throw new BadRequestException('Failed to change password');
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      
      // Always return success message for security (don't reveal if email exists)
      const successMessage = { 
        message: 'If an account with that email exists, we have sent a password reset link.' 
      };

      if (!user) {
        // Still return success to prevent email enumeration
        return successMessage;
      }

      // Generate secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExp = new Date();
      resetTokenExp.setHours(resetTokenExp.getHours() + 1); // 1 hour expiration

      // Save reset token to database
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExp,
        },
      });

      // TODO: Send email with reset link
      // For now, we'll log it (in production, use email service)
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔑 Password reset token for ${email}: ${resetToken}`);
        console.log(`🔗 Reset link: ${this.config.get('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token=${resetToken}`);
      }

      return successMessage;
    } catch (error) {
      console.error('Error in forgot password:', error);
      throw new BadRequestException('Failed to process password reset request');
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      // Find user by reset token
      const user = await this.prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExp: {
            gt: new Date(), // Token must not be expired
          },
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid or expired reset token');
      }

      // Hash new password
      const saltRounds = parseInt(this.config.get('BCRYPT_SALT_ROUNDS', '12'));
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password and clear reset token
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExp: null,
        },
      });

      return { message: 'Password reset successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error resetting password:', error);
      throw new BadRequestException('Failed to reset password');
    }
  }

  async validateResetToken(token: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExp: {
            gt: new Date(),
          },
        },
        select: {
          id: true,
          email: true,
          resetTokenExp: true,
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid or expired reset token');
      }

      return {
        valid: true,
        email: user.email,
        expiresAt: user.resetTokenExp,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error validating reset token:', error);
      throw new BadRequestException('Failed to validate reset token');
    }
  }
}
