import { Controller, Post, Body, UseGuards, Request, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto, LoginDto, AuthResponseDto, RegisterResponseDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered. Email verification required.',
    type: RegisterResponseDto
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in or 2FA required',
    schema: {
      oneOf: [
        {
          type: 'object',
          properties: {
            access_token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
                plan: { type: 'string' },
                createdAt: { type: 'string' },
              },
            },
          },
        },
        {
          type: 'object',
          properties: {
            requires2FA: { type: 'boolean', example: true },
            email: { type: 'string' },
            method: { type: 'string', enum: ['email', 'sms'] },
            message: { type: 'string' },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Request() req): Promise<AuthResponseDto | any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Current user information' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid token' })
  async getProfile(@Request() req) {
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      plan: req.user.plan,
      createdAt: req.user.createdAt,
      lastLogin: req.user.lastLogin,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user (client-side token removal)' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout() {
    // JWT is stateless, so logout is handled client-side
    // This endpoint exists for consistency and future token blacklisting
    return { message: 'Logout successful' };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Password reset email sent (if account exists)',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'If an account with that email exists, we have sent a password reset link.' }
      }
    }
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Password reset successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Password reset successfully' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired reset token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword
    );
  }

  @Get('validate-reset-token')
  @ApiOperation({ summary: 'Validate password reset token' })
  @ApiResponse({ 
    status: 200, 
    description: 'Token is valid',
    schema: {
      type: 'object',
      properties: {
        valid: { type: 'boolean', example: true },
        email: { type: 'string', example: 'user@example.com' },
        expiresAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async validateResetToken(@Body('token') token: string) {
    return this.authService.validateResetToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-account')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user account permanently' })
  @ApiResponse({ 
    status: 200, 
    description: 'Account deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Account deleted successfully' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid token' })
  async deleteAccount(@Request() req) {
    return this.authService.deleteAccount(req.user.id);
  }
}
