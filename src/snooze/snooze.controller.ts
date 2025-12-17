import {
  Controller,
  Post,
  Headers,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { SnoozeService } from './snooze.service';

@Controller('cron')
export class SnoozeController {
  private readonly logger = new Logger(SnoozeController.name);

  constructor(private readonly snoozeService: SnoozeService) {}

  @Post('restore-snoozes')
  async restoreSnoozes(
    @Headers('x-cron-secret') cronSecret: string
  ) {
    if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
      this.logger.warn('❌ Unauthorized cron attempt');
      throw new UnauthorizedException('Invalid cron secret');
    }

    this.logger.debug('⏰ Cron job triggered via Cloudflare');

    try {
      const restoredCount = await this.snoozeService.restoreDueSnoozes();

      if (restoredCount > 0) {
        this.logger.log(`✅ Restored ${restoredCount} snoozed email(s)`);
      }

      return {
        success: true,
        restoredCount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(
        '❌ Error in cron job',
        error.stack || error.message
      );
      throw error;
    }
  }
}
