import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { from } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('auth.emit')
  emit(@Payload() message: any): any {
    console.log("🚀 ~ file: app.controller.ts:16 ~ AppController ~ emit ~ message:", message)
    return from([1, 2, 3]);
  }

  @MessagePattern('auth.send')
  send(@Payload() message: any): any {
    console.log("🚀 ~ file: app.controller.ts:27 ~ AppController ~ send ~ message:", message)
    return from([4, 5, 6]);
  }
}
