import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FlowsService } from './flows.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Flows')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('flows')
export class FlowsController {
  constructor(private flowsService: FlowsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user flows' })
  async findAll(@Request() req) {
    return this.flowsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific flow' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.flowsService.findOne(id, req.user.id);
  }
}
