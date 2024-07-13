import { WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export class InvoiceQueue extends WorkerHost {
  private logger = new Logger(InvoiceQueue.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id}`);
  }
}
