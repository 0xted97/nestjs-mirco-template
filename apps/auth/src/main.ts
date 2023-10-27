import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      return new RpcException(errors);
   }
  }));
  app.useGlobalFilters(new ExceptionFilter());
  app.listen()
}
void bootstrap();
