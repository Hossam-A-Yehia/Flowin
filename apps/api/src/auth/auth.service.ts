import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../services/email.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    private emailService: EmailService,
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
      // Check if email is verified
      if (!user.emailVerified) {
        throw new UnauthorizedException('Please verify your email address before logging in. Check your inbox for the verification link.');
      }

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
      if (error instanceof UnauthorizedException) {
        throw error;
      }
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

      // Generate email verification token
      const verifyToken = crypto.randomBytes(32).toString('hex');
      const verifyExp = new Date();
      verifyExp.setHours(verifyExp.getHours() + 24); // 24 hour expiration

      // Create user with verification token
      const user = await this.usersService.create({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name?.trim(),
        emailVerifyToken: verifyToken,
        emailVerifyExp: verifyExp,
      });

      // Send verification email
      await this.emailService.sendVerificationEmail(email, verifyToken);

      // Return success message with email (don't auto-login)
      return {
        message: 'Registration successful. Please check your email to verify your account.',
        email: user.email,
        requiresVerification: true,
      };
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
      
      if (!user) {
        throw new BadRequestException('No account found with this email address');
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

      // Send password reset email
      await this.emailService.sendPasswordResetEmail(email, resetToken);

      return { 
        message: 'Password reset email sent successfully. Please check your inbox.' 
      };
    } catch (error) {
      console.error('Error in forgot password:', error);
      
      // Re-throw validation errors as-is
      if (error instanceof BadRequestException) {
        throw error;
      }
      
      // Only catch unexpected errors
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

  async findOrCreateOAuthUser(oauthData: {
    email: string;
    name: string;
    image?: string;
    provider: string;
    providerId: string;
    accessToken: string;
    refreshToken?: string;
  }) {
    try {
      // First, try to find existing user by email
      let user = await this.usersService.findByEmail(oauthData.email);

      if (user) {
        // User exists, update their OAuth info and last login
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: {
            lastLogin: new Date(),
            // Update image if provided and user doesn't have one
            image: user.image || oauthData.image,
            // Update name if user doesn't have one
            name: user.name || oauthData.name,
          },
        });
      } else {
        // Create new user with OAuth data
        const newUser = await this.usersService.create({
          email: oauthData.email.toLowerCase().trim(),
          name: oauthData.name?.trim(),
          image: oauthData.image,
          // No password for OAuth users
          password: null,
        });
        
        // Get the full user data after creation
        user = await this.usersService.findById(newUser.id);
        if (!user) {
          throw new BadRequestException('Failed to create user');
        }
      }

      // Return user data without sensitive fields
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        plan: user.plan,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      };
    } catch (error) {
      console.error('Error in findOrCreateOAuthUser:', error);
      throw new BadRequestException('Failed to process OAuth authentication');
    }
  }

  async oauthLogin(user: any) {
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
          image: user.image,
          plan: user.plan,
          createdAt: user.createdAt,
        },
      };
    } catch (error) {
      console.error('Error during OAuth login:', error);
      throw new UnauthorizedException('OAuth login failed');
    }
  }

  async deleteAccount(userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Delete user account (Prisma will handle cascading deletes based on schema)
      await this.prisma.user.delete({
        where: { id: userId },
      });

      this.logger.log(`User account deleted: ${user.email}`);
      
      return { message: 'Account deleted successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Error deleting account:', error);
      throw new BadRequestException('Failed to delete account');
    }
  }
}
