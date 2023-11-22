import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppsModule } from './apps.module';
import { TService } from '@app/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppsModule);

  app.enableCors();

  const config = app.get(ConfigService);
  const selfConfig = config.get<TService>(`services["user-gateway"]`);
  await app.listen(selfConfig.port);
  Logger.log(`🚀 UserGateway is listening ${selfConfig.port}`, "HTTP");
}
bootstrap();
