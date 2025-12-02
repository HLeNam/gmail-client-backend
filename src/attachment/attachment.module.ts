import { Module } from '@nestjs/common';
import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { GmailModule } from '../gmail/gmail.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [GmailModule, EmailModule],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
