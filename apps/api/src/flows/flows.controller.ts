import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Patch,
  Param, 
  Body,
  UseGuards, 
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FlowsService } from './flows.service';
import { ExecutionEngineService } from './execution-engine.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { ExecuteFlowDto } from './dto/execute-flow.dto';
import { FlowResponseDto, FlowWithNodesResponseDto } from './dto/flow-response.dto';

@ApiTags('Flows')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('flows')
export class FlowsController {
  constructor(
    private flowsService: FlowsService,
    private executionEngine: ExecutionEngineService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all user flows' })
  @ApiResponse({ status: 200, description: 'List of flows', type: [FlowResponseDto] })
  async findAll(@Request() req) {
    return this.flowsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific flow by ID' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiResponse({ status: 200, description: 'Flow details', type: FlowWithNodesResponseDto })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.flowsService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new flow' })
  @ApiResponse({ status: 201, description: 'Flow created successfully', type: FlowResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid flow structure' })
  async create(@Body() createFlowDto: CreateFlowDto, @Request() req) {
    return this.flowsService.create(req.user.id, createFlowDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing flow' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiResponse({ status: 200, description: 'Flow updated successfully', type: FlowResponseDto })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  @ApiResponse({ status: 400, description: 'Invalid flow structure' })
  async update(
    @Param('id') id: string,
    @Body() updateFlowDto: UpdateFlowDto,
    @Request() req,
  ) {
    return this.flowsService.update(id, req.user.id, updateFlowDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a flow' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiResponse({ status: 200, description: 'Flow deleted successfully' })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.flowsService.delete(id, req.user.id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a flow' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiResponse({ status: 200, description: 'Flow activated successfully', type: FlowResponseDto })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  async activate(@Param('id') id: string, @Request() req) {
    return this.flowsService.activate(id, req.user.id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a flow' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiResponse({ status: 200, description: 'Flow deactivated successfully', type: FlowResponseDto })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  async deactivate(@Param('id') id: string, @Request() req) {
    return this.flowsService.deactivate(id, req.user.id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a flow' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiResponse({ status: 201, description: 'Flow duplicated successfully', type: FlowResponseDto })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  async duplicate(
    @Param('id') id: string,
    @Body('name') newName: string | undefined,
    @Request() req,
  ) {
    return this.flowsService.duplicate(id, req.user.id, newName);
  }

  @Post(':id/execute')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Execute a flow manually' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiResponse({ status: 202, description: 'Flow execution queued' })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  @ApiResponse({ status: 400, description: 'Flow is not active' })
  async execute(
    @Param('id') id: string,
    @Body() executeFlowDto: ExecuteFlowDto,
    @Request() req,
  ) {
    return this.executionEngine.executeFlow(id, req.user.id, executeFlowDto.triggerData);
  }

  @Get(':id/executions')
  @ApiOperation({ summary: 'Get execution logs for a flow' })
  @ApiParam({ name: 'id', description: 'Flow ID' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of executions to return (default: 50)' })
  @ApiResponse({ status: 200, description: 'Execution logs' })
  @ApiResponse({ status: 404, description: 'Flow not found' })
  async getExecutions(
    @Param('id') id: string,
    @Query('limit') limit: string | undefined,
    @Request() req,
  ) {
    // Verify flow exists and belongs to user
    await this.flowsService.findOne(id, req.user.id);
    
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.executionEngine.getExecutionLogs(id, req.user.id, limitNum);
  }

  @Get('executions/:executionId')
  @ApiOperation({ summary: 'Get specific execution details' })
  @ApiParam({ name: 'executionId', description: 'Execution ID' })
  @ApiResponse({ status: 200, description: 'Execution details' })
  @ApiResponse({ status: 404, description: 'Execution not found' })
  async getExecution(
    @Param('executionId') executionId: string,
    @Request() req,
  ) {
    return this.executionEngine.getExecution(executionId, req.user.id);
  }

  @Post('executions/:executionId/retry')
  @ApiOperation({ summary: 'Retry a failed execution' })
  @ApiParam({ name: 'executionId', description: 'Failed execution ID' })
  @ApiResponse({ status: 201, description: 'Retry execution queued' })
  @ApiResponse({ status: 404, description: 'Execution not found' })
  @ApiResponse({ status: 400, description: 'Execution is not failed' })
  async retryExecution(
    @Param('executionId') executionId: string,
    @Request() req,
  ) {
    return this.executionEngine.retryExecution(executionId, req.user.id);
  }
}