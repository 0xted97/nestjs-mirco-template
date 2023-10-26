import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer'
          }
        }
      },
    ]),
  ],
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
