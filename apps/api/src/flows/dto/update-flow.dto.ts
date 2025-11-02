import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsObject, ValidateNested, IsBoolean, IsEnum, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFlowDto } from './create-flow.dto';

export class UpdateFlowDto extends PartialType(CreateFlowDto) {
  @ApiProperty({ example: false, required: false, description: 'Activate or deactivate the flow' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
