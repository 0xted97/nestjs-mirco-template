import { BadRequestException, Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { catchError } from 'rxjs';

@Controller('/')
export class AuthProxyController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientKafka,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) { }

  onModuleInit() {
    this.client.subscribeToResponseOf("auth.login");
    this.client.connect()
  }

  /* Test, upgrade later */
  @Get('/health')
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.responseCheck(
          'my-external-service',
          'https://google.com',
          (res) => res.status === 204,
        ),
    ]);
  }


  @Post('auth/login')
  async login(@Body() body: any) {
    const res = await this.client.send("auth.login", JSON.stringify(body)).pipe(
      catchError(error => {
        console.log("🚀 ~ file: auth.controller.ts:20 ~ AuthProxyController ~ login ~ error:", error)
        throw new BadRequestException(error);
      }
      )).toPromise();
    return res;
  }
}
