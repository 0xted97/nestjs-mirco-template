import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { AppsService } from './apps.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppsController implements OnModuleInit {
  constructor(
    private readonly appsService: AppsService,
    @Inject('AUTH_SERVICE') private client: ClientKafka,
  ) { }

  onModuleInit() {
    this.client.subscribeToResponseOf("auth.send");
    this.client.connect()
  }

  @Get('auth/emit')
  emit() {

    try {
      this.client.emit("auth.emit", { test: "emit" });
    } catch (error) {
      console.error("Error sending Kafka message:", error);
    }
  }

  @Get('auth/send')
  send() {
    try {
      this.client.send("auth.send", { test: "send" }).subscribe((data) => {
        console.log("Received data:", data);
      });
    } catch (error) {
      console.error("Error sending Kafka message:", error);
    }
  }

  @Get()
  getHello(): string {
    return this.appsService.getHello();
  }
}
