import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApiKeyDto } from './dto/api-key.dto';

@Injectable()
export class ApiKeysService {
  private readonly logger = new Logger(ApiKeysService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getUserApiKeys(userId: string) {
    try {
      const apiKeys = await this.prisma.apiKey.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          key: true,
          isActive: true,
          lastUsed: true,
          createdAt: true,
          expiresAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      // Mask the API keys for security
      return apiKeys.map(key => ({
        ...key,
        key: this.maskApiKey(key.key),
      }));
    } catch (error) {
      this.logger.error('Error fetching API keys:', error);
      throw new BadRequestException('Failed to fetch API keys');
    }
  }

  async createApiKey(userId: string, createApiKeyDto: CreateApiKeyDto) {
    try {
      // Check if user has reached the limit
      const existingKeysCount = await this.prisma.apiKey.count({
        where: { userId, isActive: true },
      });

      const maxApiKeys = this.config.get('MAX_API_KEYS_PER_USER', 5);
      if (existingKeysCount >= maxApiKeys) {
        throw new BadRequestException(`Maximum ${maxApiKeys} API keys allowed per user`);
      }

      // Generate secure API key
      const apiKey = this.generateApiKey();
      
      // Set expiration if provided
      let expiresAt = null;
      if (createApiKeyDto.expiresInDays) {
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + createApiKeyDto.expiresInDays);
      }

      const createdKey = await this.prisma.apiKey.create({
        data: {
          name: createApiKeyDto.name,
          key: apiKey,
          userId,
          permissions: createApiKeyDto.permissions || null,
          rateLimit: createApiKeyDto.rateLimit || null,
          expiresAt,
        },
        select: {
          id: true,
          name: true,
          key: true,
          isActive: true,
          createdAt: true,
          expiresAt: true,
        },
      });

      this.logger.log(`API key created for user ${userId}: ${createApiKeyDto.name}`);

      return {
        ...createdKey,
        message: 'API key created successfully. Make sure to copy it now as you won\'t be able to see it again.',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Error creating API key:', error);
      throw new BadRequestException('Failed to create API key');
    }
  }

  async deleteApiKey(userId: string, keyId: string) {
    try {
      const apiKey = await this.prisma.apiKey.findFirst({
        where: { id: keyId, userId },
      });

      if (!apiKey) {
        throw new NotFoundException('API key not found');
      }

      await this.prisma.apiKey.delete({
        where: { id: keyId },
      });

      this.logger.log(`API key deleted: ${apiKey.name} (${keyId})`);

      return { message: 'API key deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Error deleting API key:', error);
      throw new BadRequestException('Failed to delete API key');
    }
  }

  async toggleApiKey(userId: string, keyId: string) {
    try {
      const apiKey = await this.prisma.apiKey.findFirst({
        where: { id: keyId, userId },
      });

      if (!apiKey) {
        throw new NotFoundException('API key not found');
      }

      const updatedKey = await this.prisma.apiKey.update({
        where: { id: keyId },
        data: { isActive: !apiKey.isActive },
        select: {
          id: true,
          name: true,
          isActive: true,
        },
      });

      const status = updatedKey.isActive ? 'activated' : 'deactivated';
      this.logger.log(`API key ${status}: ${updatedKey.name} (${keyId})`);

      return {
        ...updatedKey,
        message: `API key ${status} successfully`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Error toggling API key:', error);
      throw new BadRequestException('Failed to update API key');
    }
  }

  async validateApiKey(apiKey: string) {
    try {
      const key = await this.prisma.apiKey.findFirst({
        where: {
          key: apiKey,
          isActive: true,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              plan: true,
            },
          },
        },
      });

      if (!key) {
        return null;
      }

      // Update last used timestamp
      await this.prisma.apiKey.update({
        where: { id: key.id },
        data: { lastUsed: new Date() },
      });

      return key;
    } catch (error) {
      this.logger.error('Error validating API key:', error);
      return null;
    }
  }

  private generateApiKey(): string {
    // Generate a secure API key with prefix
    const prefix = 'flo_';
    const randomBytes = crypto.randomBytes(32).toString('hex');
    return `${prefix}${randomBytes}`;
  }

  private maskApiKey(apiKey: string): string {
    // Show first 8 characters and last 4, mask the rest
    if (apiKey.length <= 12) {
      return '*'.repeat(apiKey.length);
    }
    const start = apiKey.substring(0, 8);
    const end = apiKey.substring(apiKey.length - 4);
    const middle = '*'.repeat(apiKey.length - 12);
    return `${start}${middle}${end}`;
  }
}
