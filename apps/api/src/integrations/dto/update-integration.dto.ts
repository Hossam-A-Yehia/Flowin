import { IsOptional, IsObject, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIntegrationDto {
  @ApiProperty({
    description: 'Updated integration credentials',
    example: { apiKey: 'sk_test_new_123' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  credentials?: Record<string, any>;

  @ApiProperty({
    description: 'Connection status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isConnected?: boolean;
}
