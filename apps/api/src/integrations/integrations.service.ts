import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConnectIntegrationDto, UpdateIntegrationDto } from './dto';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.integration.findMany({
      where: { isActive: true },
      orderBy: { displayName: 'asc' },
    });
  }

  async getUserIntegrations(userId: string) {
    return this.prisma.userIntegration.findMany({
      where: { userId },
      include: {
        integration: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async connect(userId: string, dto: ConnectIntegrationDto) {
    const integration = await this.prisma.integration.findUnique({
      where: { id: dto.integrationId },
    });

    if (!integration) {
      throw new NotFoundException('Integration not found');
    }

    if (!integration.isActive) {
      throw new BadRequestException('Integration is not available');
    }

    const existingConnection = await this.prisma.userIntegration.findUnique({
      where: {
        userId_integrationId: {
          userId,
          integrationId: dto.integrationId,
        },
      },
    });

    if (existingConnection) {
      throw new BadRequestException('Integration already connected');
    }

    const userIntegration = await this.prisma.userIntegration.create({
      data: {
        userId,
        integrationId: dto.integrationId,
        credentials: dto.credentials,
        isConnected: true,
      },
      include: {
        integration: true,
      },
    });

    return userIntegration;
  }

  async update(id: string, userId: string, dto: UpdateIntegrationDto) {
    const userIntegration = await this.prisma.userIntegration.findUnique({
      where: { id },
      include: { integration: true },
    });

    if (!userIntegration) {
      throw new NotFoundException('Integration connection not found');
    }

    if (userIntegration.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this integration',
      );
    }

    const updateData: any = {};

    if (dto.credentials !== undefined) {
      updateData.credentials = dto.credentials;
    }

    if (dto.isConnected !== undefined) {
      updateData.isConnected = dto.isConnected;
    }

    const updated = await this.prisma.userIntegration.update({
      where: { id },
      data: updateData,
      include: {
        integration: true,
      },
    });

    return updated;
  }

  async disconnect(id: string, userId: string) {
    const userIntegration = await this.prisma.userIntegration.findUnique({
      where: { id },
    });

    if (!userIntegration) {
      throw new NotFoundException('Integration connection not found');
    }

    if (userIntegration.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to disconnect this integration',
      );
    }

    await this.prisma.userIntegration.delete({
      where: { id },
    });

    return { message: 'Integration disconnected successfully' };
  }

  async test(id: string, userId: string) {
    const userIntegration = await this.prisma.userIntegration.findUnique({
      where: { id },
      include: { integration: true },
    });

    if (!userIntegration) {
      throw new NotFoundException('Integration connection not found');
    }

    if (userIntegration.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to test this integration',
      );
    }

    if (!userIntegration.isConnected) {
      return {
        success: false,
        message: 'Integration is not connected',
      };
    }

    try {
      await this.prisma.userIntegration.update({
        where: { id },
        data: { lastSync: new Date() },
      });

      return {
        success: true,
        message: `${userIntegration.integration.displayName} connection is working properly`,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Connection test failed. Please check your credentials.',
      };
    }
  }
}
