import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray, MinLength, MaxLength, Min, Max } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({ 
    example: 'My Integration Key',
    description: 'A descriptive name for the API key'
  })
  @IsString()
  @MinLength(1, { message: 'API key name is required' })
  @MaxLength(100, { message: 'API key name cannot be longer than 100 characters' })
  name: string;

  @ApiProperty({ 
    example: 30,
    description: 'Number of days until the API key expires (optional)',
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Expiration must be at least 1 day' })
  @Max(365, { message: 'Expiration cannot be more than 365 days' })
  expiresInDays?: number;

  @ApiProperty({ 
    example: ['flows:read', 'flows:write', 'executions:read'],
    description: 'Array of permissions for this API key (optional)',
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiProperty({ 
    example: 1000,
    description: 'Rate limit per hour for this API key (optional)',
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Rate limit must be at least 1 request per hour' })
  @Max(10000, { message: 'Rate limit cannot exceed 10,000 requests per hour' })
  rateLimit?: number;
}
