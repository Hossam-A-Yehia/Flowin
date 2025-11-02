import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { ExecutionEngineService } from './execution-engine.service';

@Injectable()
export class FlowExecutionWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(FlowExecutionWorker.name);
  private worker: Worker;
  private redisConnection: Redis;

  constructor(
    private configService: ConfigService,
    private executionEngine: ExecutionEngineService,
  ) {
    const redisUrl = this.configService.get<string>('REDIS_URL', 'redis://localhost:6379');
    this.redisConnection = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }

  onModuleInit() {
    this.worker = new Worker(
      'flow-execution',
      async (job) => {
        this.logger.log(`Processing flow execution job ${job.id}`);
        
        try {
          const result = await this.executionEngine.processFlowExecution(job.data);
          this.logger.log(`Flow execution ${job.data.executionId} completed successfully`);
          return result;
        } catch (error: any) {
          this.logger.error(`Flow execution ${job.data.executionId} failed: ${error.message}`, error.stack);
          throw error;
        }
      },
      {
        connection: this.redisConnection,
        concurrency: parseInt(this.configService.get<string>('FLOW_WORKER_CONCURRENCY', '5')),
      },
    );

    this.worker.on('completed', (job) => {
      this.logger.log(`Job ${job.id} completed`);
    });

    this.worker.on('failed', (job, err) => {
      this.logger.error(`Job ${job?.id} failed: ${err.message}`, err.stack);
    });

    this.worker.on('error', (err) => {
      this.logger.error(`Worker error: ${err.message}`, err.stack);
    });

    this.logger.log('✅ Flow execution worker started');
  }

  onModuleDestroy() {
    if (this.worker) {
      this.worker.close();
      this.logger.log('❌ Flow execution worker stopped');
    }
    if (this.redisConnection) {
      this.redisConnection.disconnect();
    }
  }
}
