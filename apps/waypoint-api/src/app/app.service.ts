import { Injectable } from '@nestjs/common';
import { Message } from '@odst/types';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to waypoint-api!' };
  }
}
