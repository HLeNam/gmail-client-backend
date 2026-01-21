import { Module, forwardRef } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SnoozeModule } from '../snooze/snooze.module';
import { GmailScheduler } from '../gmail/gmail.scheduler';
import { Email } from '../email/entities/email.entity';
import { EmailModule } from '../email/email.module';
import { GmailSyncState } from './entities/gmail-sync-state.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Email, GmailSyncState]),
    forwardRef(() => SnoozeModule),
    forwardRef(() => EmailModule),
  ],
  controllers: [GmailController],
  providers: [GmailService, GmailScheduler],
  exports: [GmailService],
})
export class GmailModule {}
