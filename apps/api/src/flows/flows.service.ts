import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';
import { NodeType } from '@prisma/client';

@Injectable()
export class FlowsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.flow.findMany({
      where: { userId },
      include: {
        flowNodes: {
          include: {
            integration: true,
          },
        },
        executions: {
          take: 5,
          orderBy: { startedAt: 'desc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const flow = await this.prisma.flow.findFirst({
      where: { id, userId },
      include: {
        flowNodes: {
          include: {
            integration: true,
          },
        },
        executions: {
          take: 10,
          orderBy: { startedAt: 'desc' },
        },
      },
    });

    if (!flow) {
      throw new NotFoundException('Flow not found');
    }

    return flow;
  }

  async create(userId: string, createFlowDto: CreateFlowDto) {
    // Validate flow structure
    this.validateFlowStructure(createFlowDto);

    // Create flow with nodes
    const flow = await this.prisma.flow.create({
      data: {
        name: createFlowDto.name,
        description: createFlowDto.description,
        triggerType: createFlowDto.triggerType,
        userId,
        nodes: createFlowDto.nodes as any,
        edges: (createFlowDto.edges || []) as any,
        tags: createFlowDto.tags ? JSON.stringify(createFlowDto.tags) : null,
        flowNodes: {
          create: createFlowDto.nodes.map((node) => ({
            type: node.type as NodeType,
            name: node.name,
            description: node.description,
            config: node.config as any,
            position: node.position as any,
            integrationId: node.integrationId,
            isEnabled: node.isEnabled !== false,
          })),
        },
      },
      include: {
        flowNodes: {
          include: {
            integration: true,
          },
        },
      },
    });

    return flow;
  }

  async update(id: string, userId: string, updateFlowDto: UpdateFlowDto) {
    const existingFlow = await this.prisma.flow.findFirst({
      where: { id, userId },
    });

    if (!existingFlow) {
      throw new NotFoundException('Flow not found');
    }

    // If updating structure, validate it
    if (updateFlowDto.nodes || updateFlowDto.edges || updateFlowDto.triggerType) {
      const flowToValidate = {
        ...existingFlow,
        ...updateFlowDto,
        nodes: updateFlowDto.nodes || (existingFlow.nodes as any),
        edges: updateFlowDto.edges || (existingFlow.edges as any),
        triggerType: updateFlowDto.triggerType || existingFlow.triggerType,
      };
      this.validateFlowStructure(flowToValidate as any);
    }

    // Build update data
    const updateData: any = {};

    if (updateFlowDto.name !== undefined) updateData.name = updateFlowDto.name;
    if (updateFlowDto.description !== undefined) updateData.description = updateFlowDto.description;
    if (updateFlowDto.triggerType !== undefined) updateData.triggerType = updateFlowDto.triggerType;
    if (updateFlowDto.isActive !== undefined) updateData.isActive = updateFlowDto.isActive;
    if (updateFlowDto.nodes !== undefined) {
      updateData.nodes = updateFlowDto.nodes as any;
      updateData.version = existingFlow.version + 1;
    }
    if (updateFlowDto.edges !== undefined) updateData.edges = updateFlowDto.edges as any;
    if (updateFlowDto.tags !== undefined) {
      updateData.tags = updateFlowDto.tags ? JSON.stringify(updateFlowDto.tags) : null;
    }

    // Update flow
    const flow = await this.prisma.$transaction(async (tx) => {
      // If nodes are updated, sync FlowNode records
      if (updateFlowDto.nodes) {
        // Delete existing nodes
        await tx.flowNode.deleteMany({
          where: { flowId: id },
        });

        // Create new nodes
        await tx.flowNode.createMany({
          data: updateFlowDto.nodes.map((node) => ({
            flowId: id,
            type: node.type as NodeType,
            name: node.name,
            description: node.description,
            config: node.config as any,
            position: node.position as any,
            integrationId: node.integrationId,
            isEnabled: node.isEnabled !== false,
          })),
        });
      }

      // Update flow
      return tx.flow.update({
        where: { id },
        data: updateData,
        include: {
          flowNodes: {
            include: {
              integration: true,
            },
          },
        },
      });
    });

    return flow;
  }

  async delete(id: string, userId: string) {
    const flow = await this.prisma.flow.findFirst({
      where: { id, userId },
    });

    if (!flow) {
      throw new NotFoundException('Flow not found');
    }

    await this.prisma.flow.delete({
      where: { id },
    });

    return { message: 'Flow deleted successfully' };
  }

  async activate(id: string, userId: string) {
    return this.update(id, userId, { isActive: true });
  }

  async deactivate(id: string, userId: string) {
    return this.update(id, userId, { isActive: false });
  }

  async duplicate(id: string, userId: string, newName?: string) {
    const originalFlow = await this.findOne(id, userId);

    const duplicatedFlow = await this.create(userId, {
      name: newName || `${originalFlow.name} (Copy)`,
      description: originalFlow.description || undefined,
      triggerType: originalFlow.triggerType as any,
      nodes: originalFlow.nodes as any,
      edges: originalFlow.edges as any,
      tags: originalFlow.tags ? JSON.parse(originalFlow.tags) : undefined,
    });

    return duplicatedFlow;
  }

  /**
   * Validates flow structure
   * - Must have at least one trigger node
   * - All edges must reference existing nodes
   * - Nodes must be properly connected
   */
  private validateFlowStructure(flow: CreateFlowDto | any) {
    if (!flow.nodes || flow.nodes.length === 0) {
      throw new BadRequestException('Flow must have at least one node');
    }

    // Check for at least one trigger node
    const triggerNodes = flow.nodes.filter((node: any) => node.type === 'TRIGGER');
    if (triggerNodes.length === 0) {
      throw new BadRequestException('Flow must have at least one TRIGGER node');
    }

    // Validate edges reference existing nodes
    const nodeIds = new Set(flow.nodes.map((node: any) => node.id));
    
    if (flow.edges && flow.edges.length > 0) {
      for (const edge of flow.edges) {
        if (!nodeIds.has(edge.source)) {
          throw new BadRequestException(`Edge references non-existent source node: ${edge.source}`);
        }
        if (!nodeIds.has(edge.target)) {
          throw new BadRequestException(`Edge references non-existent target node: ${edge.target}`);
        }
      }
    }

    // Validate node types
    const validNodeTypes = ['TRIGGER', 'ACTION', 'CONDITION', 'DELAY', 'AI', 'WEBHOOK'];
    for (const node of flow.nodes) {
      if (!validNodeTypes.includes(node.type)) {
        throw new BadRequestException(`Invalid node type: ${node.type}`);
      }
    }

    // Validate that trigger nodes have config object (can be empty for now, will be validated when flow is executed)
    for (const node of triggerNodes) {
      if (node.config === null || node.config === undefined) {
        throw new BadRequestException(`Trigger node "${node.name}" must have a configuration object`);
      }
      // Config can be empty {} - it will be validated when the flow is activated/executed
    }
  }
}