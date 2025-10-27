import { Controller, Get, Post, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/api-key.dto';

@ApiTags('API Keys')
@Controller('auth/api-keys')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApiKeysController {
  constructor(private apiKeysService: ApiKeysService) {}

  @Get()
  @ApiOperation({ summary: 'Get all API keys for current user' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of user API keys',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          key: { type: 'string', description: 'Masked API key' },
          isActive: { type: 'boolean' },
          lastUsed: { type: 'string', format: 'date-time', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          expiresAt: { type: 'string', format: 'date-time', nullable: true }
        }
      }
    }
  })
  async getApiKeys(@Request() req) {
    return this.apiKeysService.getUserApiKeys(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new API key' })
  @ApiBody({ type: CreateApiKeyDto })
  @ApiResponse({ 
    status: 201, 
    description: 'API key created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        key: { type: 'string', description: 'Full API key (only shown once)' },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        expiresAt: { type: 'string', format: 'date-time', nullable: true }
      }
    }
  })
  async createApiKey(@Request() req, @Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeysService.createApiKey(req.user.id, createApiKeyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an API key' })
  @ApiResponse({ 
    status: 200, 
    description: 'API key deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'API key deleted successfully' }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'API key not found' })
  async deleteApiKey(@Request() req, @Param('id') keyId: string) {
    return this.apiKeysService.deleteApiKey(req.user.id, keyId);
  }

  @Post(':id/toggle')
  @ApiOperation({ summary: 'Toggle API key active status' })
  @ApiResponse({ 
    status: 200, 
    description: 'API key status updated',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        isActive: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  })
  async toggleApiKey(@Request() req, @Param('id') keyId: string) {
    return this.apiKeysService.toggleApiKey(req.user.id, keyId);
  }
}
