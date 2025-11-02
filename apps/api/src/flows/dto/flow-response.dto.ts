import { ApiProperty } from '@nestjs/swagger';

export class FlowResponseDto {
  @ApiProperty({ example: 'clxxx123' })
  id: string;

  @ApiProperty({ example: 'Order Confirmation Flow' })
  name: string;

  @ApiProperty({ example: 'Sends confirmation message when order is received', required: false })
  description?: string;

  @ApiProperty({ example: 'webhook' })
  triggerType: string;

  @ApiProperty({ example: false })
  isActive: boolean;

  @ApiProperty({ example: { nodes: [], edges: [] } })
  nodes: any;

  @ApiProperty({ example: [] })
  edges: any;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: ['ecommerce', 'automation'], required: false })
  tags?: string[];

  @ApiProperty({ example: 0 })
  totalRuns: number;

  @ApiProperty({ example: 0 })
  successfulRuns: number;

  @ApiProperty({ example: 0 })
  failedRuns: number;

  @ApiProperty({ example: null, required: false })
  lastRun?: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}

export class FlowWithNodesResponseDto extends FlowResponseDto {
  @ApiProperty({ type: 'array', items: { type: 'object' } })
  flowNodes: any[];
}
