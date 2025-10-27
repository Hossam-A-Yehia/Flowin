import { Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TwoFactorService } from './two-factor-temp.service';
import { Enable2FADto, Verify2FADto, Disable2FADto } from './dto/two-factor.dto';

@ApiTags('Two-Factor Authentication')
@Controller('auth/2fa')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TwoFactorController {
  constructor(private twoFactorService: TwoFactorService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get 2FA status for current user' })
  @ApiResponse({ 
    status: 200, 
    description: '2FA status information',
    schema: {
      type: 'object',
      properties: {
        enabled: { type: 'boolean' },
        method: { type: 'string', enum: ['email', 'sms'], nullable: true },
        backupCodesCount: { type: 'number' }
      }
    }
  })
  async get2FAStatus(@Request() req) {
    return this.twoFactorService.get2FAStatus(req.user.id);
  }

  @Post('enable')
  @ApiOperation({ summary: 'Enable 2FA for current user' })
  @ApiBody({ type: Enable2FADto })
  @ApiResponse({ 
    status: 200, 
    description: '2FA enabled successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        backupCodes: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'One-time backup codes (save these securely)'
        }
      }
    }
  })
  async enable2FA(@Request() req, @Body() enable2FADto: Enable2FADto) {
    return this.twoFactorService.enable2FA(req.user.id, enable2FADto);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify 2FA code during login' })
  @ApiBody({ type: Verify2FADto })
  @ApiResponse({ 
    status: 200, 
    description: '2FA verification successful',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
            plan: { type: 'string' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired 2FA code' })
  async verify2FA(@Body() verify2FADto: Verify2FADto) {
    return this.twoFactorService.verify2FA(verify2FADto);
  }

  @Post('send-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send 2FA code to user (for login)' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' }
      },
      required: ['email']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: '2FA code sent successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        method: { type: 'string', enum: ['email', 'sms'] }
      }
    }
  })
  async send2FACode(@Body('email') email: string) {
    return this.twoFactorService.send2FACode(email);
  }

  @Post('disable')
  @ApiOperation({ summary: 'Disable 2FA for current user' })
  @ApiBody({ type: Disable2FADto })
  @ApiResponse({ 
    status: 200, 
    description: '2FA disabled successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '2FA disabled successfully' }
      }
    }
  })
  async disable2FA(@Request() req, @Body() disable2FADto: Disable2FADto) {
    return this.twoFactorService.disable2FA(req.user.id, disable2FADto);
  }

  @Post('regenerate-backup-codes')
  @ApiOperation({ summary: 'Regenerate 2FA backup codes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Backup codes regenerated successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        backupCodes: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'New backup codes (save these securely)'
        }
      }
    }
  })
  async regenerateBackupCodes(@Request() req) {
    return this.twoFactorService.regenerateBackupCodes(req.user.id);
  }
}
