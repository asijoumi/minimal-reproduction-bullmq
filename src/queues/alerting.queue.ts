import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('invoiceQueue')
export class AlertingQueue extends WorkerHost {
  private logger = new Logger(AlertingQueue.name);

  async process(job: Job<any, any, string>): Promise<any> {
    try {
      this.logger.log(`Processing job ${job.id}`);

      switch (job.name) {
        case 'notifyTeam':
          this.logger.log('Notifying team');
          break;
        default:
          this.logger.error('Unknown job name');
      }
    } catch (error) {
      this.logger.error(error.message)
    }

    return;
  }
}
