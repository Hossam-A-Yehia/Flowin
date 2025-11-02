import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueueService } from '../queue/queue.service';
import { ExecutionStatus, NodeType } from '@prisma/client';

export interface FlowExecutionData {
  flowId: string;
  userId: string;
  triggerData?: Record<string, any>;
}

@Injectable()
export class ExecutionEngineService {
  private readonly FLOW_QUEUE_NAME = 'flow-execution';

  constructor(
    private prisma: PrismaService,
    private queueService: QueueService,
  ) {}

  /**
   * Queue a flow execution
   */
  async executeFlow(flowId: string, userId: string, triggerData?: Record<string, any>) {
    const flow = await this.prisma.flow.findFirst({
      where: { id: flowId, userId },
      include: {
        flowNodes: {
          include: {
            integration: true,
          },
        },
      },
    });

    if (!flow) {
      throw new NotFoundException('Flow not found');
    }

    if (!flow.isActive) {
      throw new BadRequestException('Flow is not active');
    }

    // Create execution record
    const execution = await this.prisma.execution.create({
      data: {
        flowId,
        userId,
        status: ExecutionStatus.PENDING,
        triggerData: triggerData || {},
        steps: {
          create: flow.flowNodes
            .filter((node) => node.isEnabled)
            .sort((a, b) => {
              // Simple sorting: TRIGGER first, then others
              if (a.type === NodeType.TRIGGER) return -1;
              if (b.type === NodeType.TRIGGER) return 1;
              return 0;
            })
            .map((node, index) => ({
              nodeId: node.id,
              stepNumber: index + 1,
              name: node.name,
              status: ExecutionStatus.PENDING,
            })),
        },
      },
      include: {
        steps: true,
      },
    });

    // Queue the execution
    await this.queueService.addJob(
      this.FLOW_QUEUE_NAME,
      'execute-flow',
      {
        executionId: execution.id,
        flowId,
        userId,
        triggerData: triggerData || {},
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    );

    return execution;
  }

  /**
   * Process flow execution (called by worker)
   */
  async processFlowExecution(data: {
    executionId: string;
    flowId: string;
    userId: string;
    triggerData: Record<string, any>;
  }) {
    const { executionId, flowId, triggerData } = data;

    // Get execution with flow
    const execution = await this.prisma.execution.findUnique({
      where: { id: executionId },
      include: {
        flow: {
          include: {
            flowNodes: {
              include: {
                integration: true,
              },
              where: {
                isEnabled: true,
              },
              orderBy: [
                { type: 'asc' }, // TRIGGER first
                { createdAt: 'asc' },
              ],
            },
          },
        },
        steps: {
          orderBy: { stepNumber: 'asc' },
        },
      },
    });

    if (!execution) {
      throw new NotFoundException('Execution not found');
    }

    // Update execution status to RUNNING
    await this.prisma.execution.update({
      where: { id: executionId },
      data: {
        status: ExecutionStatus.RUNNING,
      },
    });

    let currentData = triggerData;
    let executionSuccess = true;
    let errorMessage: string | null = null;

    try {
      // Execute each step sequentially
      for (const step of execution.steps) {
        const node = execution.flow.flowNodes.find((n) => n.id === step.nodeId);
        
        if (!node) {
          throw new Error(`Node ${step.nodeId} not found`);
        }

        // Update step status to RUNNING
        await this.prisma.executionStep.update({
          where: { id: step.id },
          data: {
            status: ExecutionStatus.RUNNING,
            input: currentData,
          },
        });

        const stepStartTime = Date.now();

        try {
          // Execute the node
          const result = await this.executeNode(node, currentData);

          const stepDuration = Date.now() - stepStartTime;

          // Update step with success
          await this.prisma.executionStep.update({
            where: { id: step.id },
            data: {
              status: ExecutionStatus.SUCCESS,
              output: result,
              completedAt: new Date(),
              duration: stepDuration,
            },
          });

          // Update current data with result
          currentData = { ...currentData, ...result };

        } catch (error: any) {
          const stepDuration = Date.now() - stepStartTime;
          errorMessage = error.message || 'Unknown error';

          // Update step with failure
          await this.prisma.executionStep.update({
            where: { id: step.id },
            data: {
              status: ExecutionStatus.FAILED,
              errorMessage,
              completedAt: new Date(),
              duration: stepDuration,
            },
          });

          executionSuccess = false;
          break; // Stop execution on error
        }
      }

      // Update execution status
      const executionDuration = Date.now() - execution.startedAt.getTime();

      await this.prisma.execution.update({
        where: { id: executionId },
        data: {
          status: executionSuccess ? ExecutionStatus.SUCCESS : ExecutionStatus.FAILED,
          completedAt: new Date(),
          duration: executionDuration,
          output: currentData,
          errorMessage,
        },
      });

      // Update flow statistics
      await this.updateFlowStatistics(flowId, executionSuccess);

    } catch (error: any) {
      // Mark execution as failed
      await this.prisma.execution.update({
        where: { id: executionId },
        data: {
          status: ExecutionStatus.FAILED,
          completedAt: new Date(),
          errorMessage: error.message || 'Execution failed',
        },
      });

      await this.updateFlowStatistics(flowId, false);
      throw error;
    }

    return execution;
  }

  /**
   * Execute a single node
   */
  private async executeNode(node: any, inputData: Record<string, any>): Promise<Record<string, any>> {
    switch (node.type) {
      case NodeType.TRIGGER:
        // Trigger nodes just pass through the input data
        return inputData;

      case NodeType.ACTION:
        // For now, action nodes are placeholders
        // TODO: Implement actual integration execution
        return {
          nodeId: node.id,
          nodeName: node.name,
          executed: true,
          timestamp: new Date().toISOString(),
          ...node.config,
        };

      case NodeType.CONDITION:
        // Basic condition evaluation
        const condition = node.config?.condition;
        if (condition) {
          // Simple condition evaluation (can be expanded)
          const result = this.evaluateCondition(condition, inputData);
          return { conditionResult: result, passed: result };
        }
        return { conditionResult: true, passed: true };

      case NodeType.DELAY:
        // Delay execution
        const delayMs = node.config?.delayMs || 1000;
        await this.sleep(delayMs);
        return { delayed: delayMs };

      case NodeType.AI:
        // AI node placeholder
        // TODO: Implement AI processing
        return { aiProcessed: true, output: 'AI processing not yet implemented' };

      case NodeType.WEBHOOK:
        // Webhook node placeholder
        // TODO: Implement webhook handling
        return { webhookReceived: true, data: inputData };

      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  /**
   * Evaluate condition (simple implementation)
   */
  private evaluateCondition(condition: any, data: Record<string, any>): boolean {
    // Simple condition evaluation
    // TODO: Implement more sophisticated condition evaluation
    if (typeof condition === 'boolean') return condition;
    if (typeof condition === 'string') {
      // Try to evaluate as expression
      try {
        // Basic string matching
        return true; // Placeholder
      } catch {
        return false;
      }
    }
    return true;
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Update flow statistics
   */
  private async updateFlowStatistics(flowId: string, success: boolean) {
    await this.prisma.flow.update({
      where: { id: flowId },
      data: {
        totalRuns: { increment: 1 },
        successfulRuns: success ? { increment: 1 } : undefined,
        failedRuns: success ? undefined : { increment: 1 },
        lastRun: new Date(),
      },
    });
  }

  /**
   * Get execution logs
   */
  async getExecutionLogs(flowId: string, userId: string, limit: number = 50) {
    const executions = await this.prisma.execution.findMany({
      where: {
        flowId,
        userId,
      },
      include: {
        steps: {
          orderBy: { stepNumber: 'asc' },
        },
      },
      orderBy: { startedAt: 'desc' },
      take: limit,
    });

    return executions;
  }

  /**
   * Retry failed execution
   */
  async retryExecution(executionId: string, userId: string) {
    // First check if execution exists and belongs to user
    const executionCheck = await this.prisma.execution.findFirst({
      where: {
        id: executionId,
        userId,
      },
      include: {
        flow: true,
      },
    });

    if (!executionCheck) {
      throw new NotFoundException('Execution not found');
    }

    // Only allow retrying failed executions
    if (executionCheck.status !== ExecutionStatus.FAILED) {
      throw new BadRequestException(
        `Cannot retry execution with status "${executionCheck.status}". Only failed executions can be retried.`
      );
    }

    // Create new execution
    return this.executeFlow(executionCheck.flowId, userId, executionCheck.triggerData as any);
  }

  /**
   * Get execution by ID
   */
  async getExecution(executionId: string, userId: string) {
    const execution = await this.prisma.execution.findFirst({
      where: {
        id: executionId,
        userId,
      },
      include: {
        steps: {
          orderBy: { stepNumber: 'asc' },
        },
        flow: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!execution) {
      throw new NotFoundException('Execution not found');
    }

    return execution;
  }
}
