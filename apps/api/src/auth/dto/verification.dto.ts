import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsPhoneNumber, IsOptional, Length, Matches } from 'class-validator';

export class SendEmailVerificationDto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Email address to send verification to'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
}

export class VerifyEmailDto {
  @ApiProperty({ 
    example: 'abc123def456ghi789',
    description: 'Email verification token from email'
  })
  @IsString()
  @MinLength(1, { message: 'Verification token is required' })
  token: string;
}

export class AddPhoneDto {
  @ApiProperty({ 
    example: '+1234567890',
    description: 'Phone number in international format'
  })
  @IsPhoneNumber(null, { message: 'Please provide a valid phone number' })
  phone: string;
}

export class SendPhoneVerificationDto {
  @ApiProperty({ 
    example: '+1234567890',
    description: 'Phone number to send SMS verification code to'
  })
  @IsPhoneNumber(null, { message: 'Please provide a valid phone number' })
  phone: string;
}

export class VerifyPhoneDto {
  @ApiProperty({ 
    example: '+1234567890',
    description: 'Phone number being verified'
  })
  @IsPhoneNumber(null, { message: 'Please provide a valid phone number' })
  phone: string;

  @ApiProperty({ 
    example: '123456',
    description: '6-digit verification code from SMS'
  })
  @IsString()
  @Length(6, 6, { message: 'Verification code must be exactly 6 digits' })
  @Matches(/^\d{6}$/, { message: 'Verification code must contain only digits' })
  code: string;
}

export class ResendVerificationDto {
  @ApiProperty({ 
    example: 'email',
    description: 'Type of verification to resend',
    enum: ['email', 'phone']
  })
  @IsString()
  @Matches(/^(email|phone)$/, { message: 'Type must be either "email" or "phone"' })
  type: 'email' | 'phone';

  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Email or phone number to resend verification to',
    required: false
  })
  @IsOptional()
  @IsString()
  contact?: string;
}
