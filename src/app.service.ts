import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to FindMyRep, we trust you\'ll have a swell time';
  }
}
