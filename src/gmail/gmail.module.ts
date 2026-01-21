import { Module, forwardRef } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SnoozeModule } from '../snooze/snooze.module';
import { GmailScheduler } from '../gmail/gmail.scheduler';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => SnoozeModule),
  ],
  controllers: [GmailController],
  providers: [GmailService, GmailScheduler],
  exports: [GmailService],
})
export class GmailModule {}
