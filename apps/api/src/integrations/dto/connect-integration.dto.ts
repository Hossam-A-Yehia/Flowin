import { IsNotEmpty, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConnectIntegrationDto {
  @ApiProperty({
    description: 'Integration ID to connect',
    example: 'clx1234567890',
  })
  @IsNotEmpty()
  @IsString()
  integrationId: string;

  @ApiProperty({
    description: 'Integration credentials (OAuth tokens, API keys, etc.)',
    example: { apiKey: 'sk_test_123', apiSecret: 'secret_456' },
  })
  @IsObject()
  credentials: Record<string, any>;
}
