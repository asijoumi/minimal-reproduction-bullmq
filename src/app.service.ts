import { InjectFlowProducer, InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { FlowProducer, Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(
    @InjectFlowProducer('invoiceFlow') private flow: FlowProducer,
    @InjectQueue('alertingQueue') private alertingQueue: Queue,
    @InjectQueue('invoiceQueue') private invoiceQueue: Queue,
    @InjectQueue('notificationQueue') private notificationQueue: Queue,
  ) {}

  async process() {
    await this.flow.add({
      name: 'createInvoice',
      queueName: 'invoiceQueue',
      children: [
        {
          name: 'notifyUser',
          queueName: 'notificationQueue',
        },
        {
          name: 'notifyTeam',
          queueName: 'alertingQueue',
        },
      ],
    });
  }
}
