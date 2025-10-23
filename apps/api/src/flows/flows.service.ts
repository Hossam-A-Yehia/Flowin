import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlowsService {
  constructor(private prisma: PrismaService) {}

  // Placeholder for flow management
  async findAll(userId: string) {
    return this.prisma.flow.findMany({
      where: { userId },
      include: {
        executions: {
          take: 5,
          orderBy: { startedAt: 'desc' },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.flow.findFirst({
      where: { id, userId },
      include: {
        flowNodes: true,
        executions: {
          take: 10,
          orderBy: { startedAt: 'desc' },
        },
      },
    });
  }
}
