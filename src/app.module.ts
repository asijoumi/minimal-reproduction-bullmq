import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertingQueue } from './queues/alerting.queue';
import { InvoiceQueue } from './queues/invoice.queue';
import { NotificationQueue } from './queues/notification.queue';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue(
      { name: 'invoiceQueue' },
      { name: 'notificationQueue' },
      { name: 'alertingQueue' },
    ),
    BullModule.registerFlowProducer({
      name: 'invoiceFlow',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, InvoiceQueue, NotificationQueue, AlertingQueue],
})
export class AppModule {}
