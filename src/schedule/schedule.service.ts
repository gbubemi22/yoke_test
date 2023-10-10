import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import * as qr from 'qrcode';
import * as moviesJson from '../movies.json'; // Import the JSON data

@Injectable()
export class ScheduleService {
  private qrCodeLink = '';
  private movies: any[] = [];

  constructor() {
    this.initialSetup();
  }

  @Cron('*/10 * * * * *') // Runs every 10 seconds
  async updateQRCode() {
    this.qrCodeLink = await this.generateQRCode();
  }

  @Interval(60000) // Runs every 60 seconds (for example, to refresh movie data)
  async updateMovies() {
    this.movies = await this.generateRandomMovies();
  }

  @Timeout(5000) // Runs once, 5 seconds after app starts (initial setup)
  async initialSetup() {
    try {
      this.movies = moviesJson;
      console.log('Movies initialized:', this.movies);
    } catch (error) {
      console.error('Error loading movies data:', error);
      this.movies = []; // Initialize with an empty array in case of an error
    }
    this.qrCodeLink = await this.generateQRCode();
  }

  async generateQRCode(): Promise<string> {
    const link = 'localhost:3000/movies/qr-code';
    const qrCode = await qr.toDataURL(link);
    return qrCode;
  }

  async generateRandomMovies(): Promise<any[]> {
    if (!this.movies || this.movies.length === 0) {
      return []; // Return an empty array if movies data is not available
    }

    const shuffled = this.movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); // Assuming you want to return 10 random movies
  }
}
