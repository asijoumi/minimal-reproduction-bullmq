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
    const id = Math.floor(Math.random() * 10000);

    await this.flow.add({
      name: 'createInvoice',
      queueName: 'invoiceQueue',
      data: { id },
      children: [
        {
          name: 'notifyUser',
          queueName: 'notificationQueue',
          data: { id },
        },
        {
          name: 'notifyTeam',
          queueName: 'alertingQueue',
          data: { id },
        },
      ],
    });
  }
}
