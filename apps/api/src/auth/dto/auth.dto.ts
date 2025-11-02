import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, Matches, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Valid email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    example: 'SecurePass123!',
    description: 'Password must be at least 8 characters with uppercase, lowercase, number and special character'
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    { message: 'Password must contain uppercase, lowercase, number and special character' }
  )
  password: string;

  @ApiProperty({ 
    example: 'John Doe', 
    required: false,
    description: 'Full name (optional)'
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Name cannot be longer than 100 characters' })
  name?: string;
}

export class LoginDto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Your registered email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ 
    example: 'SecurePass123!',
    description: 'Your account password'
  })
  @IsString()
  @MinLength(1, { message: 'Password is required' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @ApiProperty({
    example: {
      id: 'clxxx123',
      email: 'user@example.com',
      name: 'John Doe',
      plan: 'FREE'
    }
  })
  user: {
    id: string;
    email: string;
    name: string;
    plan: string;
  };
}

export class OAuthResponseDto extends AuthResponseDto {
  @ApiProperty({
    example: {
      id: 'clxxx123',
      email: 'user@example.com',
      name: 'John Doe',
      image: 'https://example.com/avatar.jpg',
      plan: 'FREE'
    }
  })
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    plan: string;
  };
}

export class ForgotPasswordDto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Email address to send reset link to'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ 
    example: 'abc123def456ghi789',
    description: 'Password reset token from email'
  })
  @IsString()
  @MinLength(1, { message: 'Reset token is required' })
  token: string;

  @ApiProperty({ 
    example: 'NewSecurePass123!',
    description: 'New password must be at least 8 characters with uppercase, lowercase, number and special character'
  })
  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    { message: 'New password must contain uppercase, lowercase, number and special character' }
  )
  newPassword: string;
}

export class RegisterResponseDto {
  @ApiProperty({ 
    example: 'Registration successful. Please check your email to verify your account.',
    description: 'Success message'
  })
  message: string;

  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Registered email address'
  })
  email: string;

  @ApiProperty({ 
    example: true,
    description: 'Indicates that email verification is required'
  })
  requiresVerification: boolean;
}
