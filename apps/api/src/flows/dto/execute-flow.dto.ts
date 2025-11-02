import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsObject } from 'class-validator';

export class ExecuteFlowDto {
  @ApiProperty({ 
    example: { orderId: '12345', customerName: 'John Doe' },
    required: false,
    description: 'Optional trigger data to pass to the flow'
  })
  @IsOptional()
  @IsObject()
  triggerData?: Record<string, any>;
}
