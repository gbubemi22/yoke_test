import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QrCodeController } from './qr-code/qr-code.controller';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  imports: [],
  controllers: [AppController, QrCodeController],
  providers: [AppService, ScheduleService],
})
export class AppModule {}
