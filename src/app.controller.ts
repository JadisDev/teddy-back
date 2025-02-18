import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ping')
@Controller()
export class AppController {

  @Get()
  getHello(): { ping: string } {
    return { ping: 'pong' };
  }
}
