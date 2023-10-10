import { Controller, Get } from '@nestjs/common';
import { ScheduleService } from 'src/schedule/schedule.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async getQRCode(): Promise<string> {
    const qrCodeLink = await this.scheduleService.generateQRCode();
    return `<img src="${qrCodeLink}" alt="QR Code" />`;
  }

  @Get('movies')
  async getMovies(): Promise<any[]> {
    const movies = await this.scheduleService.generateRandomMovies();
    return movies;
  }
}
