import { Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { VerificationService } from './verification.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { 
  SendEmailVerificationDto, 
  VerifyEmailDto, 
  SendPhoneVerificationDto, 
  VerifyPhoneDto,
  ResendVerificationDto 
} from './dto/verification.dto';

@ApiTags('Verification')
@Controller('auth/verify')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  // ================================
  // EMAIL VERIFICATION
  // ================================

  @Post('email/send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send email verification link' })
  @ApiBody({ type: SendEmailVerificationDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Verification email sent',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Verification email sent. Please check your inbox and click the verification link.' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async sendEmailVerification(@Body() dto: SendEmailVerificationDto) {
    return this.verificationService.sendEmailVerification(dto.email);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify email with token' })
  @ApiBody({ type: VerifyEmailDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Email verified successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Email verified successfully' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired verification token' })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.verificationService.verifyEmail(dto.token);
  }

  // ================================
  // PHONE VERIFICATION
  // ================================

  @Post('phone/send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send SMS verification code' })
  @ApiBody({ type: SendPhoneVerificationDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Verification code sent',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Verification code sent to your phone. Please enter the 6-digit code.' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'No account found with this phone number' })
  async sendPhoneVerification(@Body() dto: SendPhoneVerificationDto) {
    return this.verificationService.sendPhoneVerification(dto.phone);
  }

  @Post('phone/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify phone with SMS code' })
  @ApiBody({ type: VerifyPhoneDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Phone verified successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Phone number verified successfully' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired verification code' })
  async verifyPhone(@Body() dto: VerifyPhoneDto) {
    return this.verificationService.verifyPhone(dto.phone, dto.code);
  }

  // ================================
  // AUTHENTICATED USER VERIFICATION
  // ================================

  @UseGuards(JwtAuthGuard)
  @Post('phone/add-and-send')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add phone number and send verification code (authenticated)' })
  @ApiBody({ type: SendPhoneVerificationDto })
  @ApiResponse({ status: 200, description: 'Phone added and verification code sent' })
  async addPhoneAndSendVerification(@Request() req, @Body() dto: SendPhoneVerificationDto) {
    return this.verificationService.sendPhoneVerification(dto.phone, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('phone/verify-mine')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify own phone number (authenticated)' })
  @ApiBody({ type: VerifyPhoneDto })
  @ApiResponse({ status: 200, description: 'Phone verified successfully' })
  async verifyMyPhone(@Request() req, @Body() dto: VerifyPhoneDto) {
    return this.verificationService.verifyPhone(dto.phone, dto.code, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('resend')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Resend verification (email or phone)' })
  @ApiBody({ type: ResendVerificationDto })
  @ApiResponse({ status: 200, description: 'Verification resent successfully' })
  async resendVerification(@Request() req, @Body() dto: ResendVerificationDto) {
    return this.verificationService.resendVerification(dto.type, req.user.id, dto.contact);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get verification status for current user' })
  @ApiResponse({ 
    status: 200, 
    description: 'Verification status',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'object',
          properties: {
            verified: { type: 'boolean' },
            verifiedAt: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        phone: {
          type: 'object',
          properties: {
            number: { type: 'string', nullable: true },
            verified: { type: 'boolean' },
            verifiedAt: { type: 'string', format: 'date-time', nullable: true }
          }
        }
      }
    }
  })
  async getVerificationStatus(@Request() req) {
    return this.verificationService.getVerificationStatus(req.user.id);
  }
}
