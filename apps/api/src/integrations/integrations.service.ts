import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  // Placeholder for integration management
  async findAll() {
    return this.prisma.integration.findMany({
      where: { isActive: true },
    });
  }

  async getUserIntegrations(userId: string) {
    return this.prisma.userIntegration.findMany({
      where: { userId },
      include: {
        integration: true,
      },
    });
  }
}
