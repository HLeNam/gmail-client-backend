import { Module, forwardRef } from '@nestjs/common';
import { SnoozeService } from './snooze.service';
import { GmailModule } from '../gmail/gmail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailSnooze } from '../email/entities/email-snooze.entity';
import { SnoozeScheduler } from '../snooze/snooze.scheduler';
import { EmailKanbanOrder } from '../email/entities/email-kanban-order.entity';
import { SnoozeController } from './snooze.controller';
import { KanbanColumnConfig } from '../kanban/entities/kanban-column-config.entity';
import { User } from '../user/entities/user.entity';
import { SnoozeGateway } from '../snooze/snooze.gateway';
import { WebSocketConnectionManager } from '../snooze/websocket-connection.manager';

@Module({
  imports: [
    forwardRef(() => GmailModule),
    TypeOrmModule.forFeature([
      EmailSnooze,
      EmailKanbanOrder,
      KanbanColumnConfig,
      User,
    ]),
  ],
  providers: [
    SnoozeService,
    SnoozeScheduler,
    SnoozeGateway,
    WebSocketConnectionManager,
  ],
  exports: [SnoozeService, SnoozeGateway, WebSocketConnectionManager],
  controllers: [SnoozeController],
})
export class SnoozeModule {}
