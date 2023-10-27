import { BadRequestException, Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('/')
export class AuthProxyController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientKafka,
  ) { }

  onModuleInit() {
    this.client.subscribeToResponseOf("auth.login");
    this.client.connect()
  }

  @Post('auth/login')
  async login(@Body() body: any) {
    const res = await this.client.send("auth.login", JSON.stringify(body)).pipe(
      catchError(error => {
        console.log("🚀 ~ file: auth.controller.ts:20 ~ AuthProxyController ~ login ~ error:", error)
        throw new BadRequestException(error.message);
      }
    )).toPromise();
    return res;
  }
}
