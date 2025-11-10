import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConnectIntegrationDto, UpdateIntegrationDto } from './dto';

@ApiTags('Integrations')
@Controller('integrations')
export class IntegrationsController {
  constructor(private integrationsService: IntegrationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available integrations' })
  @ApiResponse({ status: 200, description: 'List of available integrations' })
  async findAll() {
    return this.integrationsService.findAll();
  }

  @Get('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user connected integrations' })
  @ApiResponse({
    status: 200,
    description: 'List of user connected integrations',
  })
  async getUserIntegrations(@Request() req) {
    return this.integrationsService.getUserIntegrations(req.user.id);
  }

  @Post('connect')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Connect a new integration' })
  @ApiResponse({
    status: 201,
    description: 'Integration connected successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request or already connected' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async connect(@Body() dto: ConnectIntegrationDto, @Request() req) {
    return this.integrationsService.connect(req.user.id, dto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update integration credentials' })
  @ApiParam({ name: 'id', description: 'User Integration ID' })
  @ApiResponse({
    status: 200,
    description: 'Integration updated successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Integration connection not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateIntegrationDto,
    @Request() req,
  ) {
    return this.integrationsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Disconnect integration' })
  @ApiParam({ name: 'id', description: 'User Integration ID' })
  @ApiResponse({
    status: 200,
    description: 'Integration disconnected successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Integration connection not found' })
  async disconnect(@Param('id') id: string, @Request() req) {
    return this.integrationsService.disconnect(id, req.user.id);
  }

  @Post(':id/test')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Test integration connection' })
  @ApiParam({ name: 'id', description: 'User Integration ID' })
  @ApiResponse({
    status: 200,
    description: 'Connection test result',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Integration connection not found' })
  async test(@Param('id') id: string, @Request() req) {
    return this.integrationsService.test(id, req.user.id);
  }
}
