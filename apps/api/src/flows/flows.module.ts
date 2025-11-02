import { Module } from '@nestjs/common';
import { FlowsService } from './flows.service';
import { FlowsController } from './flows.controller';
import { ExecutionEngineService } from './execution-engine.service';
import { FlowExecutionWorker } from './flow-execution.worker';
import { PrismaModule } from '../prisma/prisma.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [PrismaModule, QueueModule],
  controllers: [FlowsController],
  providers: [FlowsService, ExecutionEngineService, FlowExecutionWorker],
  exports: [FlowsService, ExecutionEngineService],
})
export class FlowsModule {}