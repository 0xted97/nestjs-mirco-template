import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ExceptionFilter, TKafka, TService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const kafkaConfig = config.get<TKafka>(`kafka`);
  const selfConfig = config.get<TService>(`services.auth`);

  const kafkaService = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [...kafkaConfig.brokers],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    }
  });
  kafkaService.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      return new RpcException(errors);
    }
  }));
  kafkaService.useGlobalFilters(new ExceptionFilter());
  await app.listen(selfConfig.port);
  await kafkaService.listen();

  Logger.log(`🚀 Auth is listening ${selfConfig.port}`, "HTTP");
}
void bootstrap();
