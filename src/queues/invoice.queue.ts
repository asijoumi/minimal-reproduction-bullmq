import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('invoiceQueue')
export class InvoiceQueue extends WorkerHost {
  private logger = new Logger(InvoiceQueue.name);

  async process(job: Job<any, any, string>): Promise<any> {
    try {
      switch (job.name) {
        case 'createInvoice':
          this.logger.log(`Creating invoice for ${job.data.id}`);
          break;
        default:
          this.logger.error('Unknown job name');
      }
    } catch (error) {
      this.logger.error(error.message);
    }

    return;
  }
}
