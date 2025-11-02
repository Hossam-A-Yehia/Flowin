import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsObject, ValidateNested, IsBoolean, IsEnum, IsNumber, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export enum TriggerType {
  WEBHOOK = 'webhook',
  SCHEDULE = 'schedule',
  MANUAL = 'manual',
}

export class FlowNodePositionDto {
  @ApiProperty({ example: 100, description: 'X coordinate' })
  @IsNumber()
  x: number;

  @ApiProperty({ example: 200, description: 'Y coordinate' })
  @IsNumber()
  y: number;
}

export class FlowNodeDto {
  @ApiProperty({ example: 'node_1', description: 'Node unique identifier' })
  @IsString()
  id: string;

  @ApiProperty({ 
    enum: ['TRIGGER', 'ACTION', 'CONDITION', 'DELAY', 'AI', 'WEBHOOK'],
    example: 'TRIGGER',
    description: 'Node type'
  })
  @IsEnum(['TRIGGER', 'ACTION', 'CONDITION', 'DELAY', 'AI', 'WEBHOOK'])
  type: string;

  @ApiProperty({ example: 'New Webhook Trigger', description: 'Node name' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'Triggers when webhook is received', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: { integrationId: 'google_sheets', action: 'add_row' }, description: 'Node configuration' })
  @IsObject()
  config: Record<string, any>;

  @ApiProperty({ example: { x: 100, y: 200 }, description: 'Node position on canvas' })
  @ValidateNested()
  @Type(() => FlowNodePositionDto)
  position: FlowNodePositionDto;

  @ApiProperty({ example: 'integration_123', required: false })
  @IsOptional()
  @IsString()
  integrationId?: string;

  @ApiProperty({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}

export class FlowEdgeDto {
  @ApiProperty({ example: 'edge_1', description: 'Edge unique identifier' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'node_1', description: 'Source node ID' })
  @IsString()
  source: string;

  @ApiProperty({ example: 'node_2', description: 'Target node ID' })
  @IsString()
  target: string;

  @ApiProperty({ example: 'success', required: false, description: 'Edge condition (for condition nodes)' })
  @IsOptional()
  @IsString()
  condition?: string;
}

export class CreateFlowDto {
  @ApiProperty({ example: 'Order Confirmation Flow', description: 'Flow name' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @ApiProperty({ 
    example: 'Sends confirmation message when order is received',
    required: false,
    description: 'Flow description'
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ 
    enum: ['webhook', 'schedule', 'manual'],
    example: 'webhook',
    description: 'Trigger type for the flow'
  })
  @IsEnum(TriggerType)
  triggerType: TriggerType;

  @ApiProperty({ 
    type: [FlowNodeDto],
    example: [
      { id: 'node_1', type: 'TRIGGER', name: 'Webhook Trigger', config: {}, position: { x: 100, y: 100 } },
      { id: 'node_2', type: 'ACTION', name: 'Send Email', config: {}, position: { x: 300, y: 100 } }
    ],
    description: 'Array of flow nodes'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlowNodeDto)
  nodes: FlowNodeDto[];

  @ApiProperty({ 
    type: [FlowEdgeDto],
    example: [
      { id: 'edge_1', source: 'node_1', target: 'node_2' }
    ],
    description: 'Array of edges connecting nodes',
    required: false
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlowEdgeDto)
  edges?: FlowEdgeDto[];

  @ApiProperty({ 
    example: ['ecommerce', 'automation'],
    required: false,
    description: 'Flow tags for categorization'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
