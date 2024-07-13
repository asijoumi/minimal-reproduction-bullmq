import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('notificationQueue')
export class NotificationQueue extends WorkerHost {
  private logger = new Logger(NotificationQueue.name);

  async process(job: Job<any, any, string>): Promise<any> {
    try {
      this.logger.log(`Processing job ${job.id}`);

      switch (job.name) {
        case 'notifyUser':
          this.logger.log('Notifying user');
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
