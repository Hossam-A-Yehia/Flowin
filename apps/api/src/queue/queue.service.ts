import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private redisConnection: Redis;
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();
  private queueEvents: Map<string, QueueEvents> = new Map();

  constructor(private configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL', 'redis://localhost:6379');
    this.redisConnection = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });
  }

  onModuleInit() {
    console.log('✅ Queue service initialized');
  }

  onModuleDestroy() {
    // Close all queues and workers
    this.workers.forEach((worker) => worker.close());
    this.queueEvents.forEach((events) => events.close());
    this.queues.forEach((queue) => queue.close());
    this.redisConnection.disconnect();
    console.log('❌ Queue service disconnected');
  }

  getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      this.queues.set(
        name,
        new Queue(name, {
          connection: this.redisConnection,
        }),
      );
    }
    return this.queues.get(name)!;
  }

  getQueueEvents(name: string): QueueEvents {
    if (!this.queueEvents.has(name)) {
      this.queueEvents.set(
        name,
        new QueueEvents(name, {
          connection: this.redisConnection,
        }),
      );
    }
    return this.queueEvents.get(name)!;
  }

  async addJob(queueName: string, jobName: string, data: any, options?: any) {
    const queue = this.getQueue(queueName);
    return queue.add(jobName, data, options);
  }

  async getJob(queueName: string, jobId: string) {
    const queue = this.getQueue(queueName);
    return queue.getJob(jobId);
  }
}
