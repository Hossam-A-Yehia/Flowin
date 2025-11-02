import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsIn, MinLength, MaxLength, Matches, IsOptional, ValidateIf } from 'class-validator';

export class Enable2FADto {
  @ApiProperty({ 
    example: 'email',
    description: 'Method for 2FA delivery',
    enum: ['email', 'sms']
  })
  @IsString()
  @IsIn(['email', 'sms'], { message: 'Method must be either "email" or "sms"' })
  method: 'email' | 'sms';

  @ApiProperty({ 
    example: 'MyCurrentPassword123!',
    description: 'Current password to confirm 2FA enable (required for security)'
  })
  @IsString()
  @MinLength(1, { message: 'Password is required to enable 2FA' })
  password: string;

  @ApiProperty({ 
    example: '+1234567890',
    description: 'Phone number (required only if method is SMS)',
    required: false
  })
  @IsOptional()
  @ValidateIf((o) => o.method === 'sms')
  @IsString({ message: 'Phone number must be a string when method is SMS' })
  phone?: string;
}

export class Verify2FADto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'User email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    example: '123456',
    description: '6-digit 2FA code or backup code'
  })
  @IsString()
  @MinLength(6, { message: '2FA code must be at least 6 characters' })
  @MaxLength(12, { message: '2FA code cannot be longer than 12 characters' })
  code: string;
}

export class Disable2FADto {
  @ApiProperty({ 
    example: 'MyCurrentPassword123!',
    description: 'Current password to confirm 2FA disable'
  })
  @IsString()
  @MinLength(1, { message: 'Password is required to disable 2FA' })
  password: string;
}

export class Send2FACodeDto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Email address to send 2FA code to'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
}
