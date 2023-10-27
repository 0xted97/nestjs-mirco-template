import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthProxyController } from './auth/auth.controller';

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
  controllers: [AuthProxyController],
  providers: [],
})
export class AppsModule {}
