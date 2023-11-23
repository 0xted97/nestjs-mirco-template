import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { AuthProxyController } from './auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigModule } from '@app/modules';
import { TKafka } from '@app/common';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    CustomConfigModule.register(),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'AUTH_SERVICE',

          useFactory: async (configService: ConfigService) => {
            const kafkaConfig = configService.getOrThrow<TKafka>("kafka");
            return {
              transport: Transport.KAFKA,
              options: {
                client: {
                  brokers: [...kafkaConfig.brokers],
                },
                consumer: {
                  groupId: 'auth-consumer'
                }
              },
            }
          },
          imports: [ConfigModule],
          inject: [ConfigService]
        }
      ]
    }),
  ],
  controllers: [AuthProxyController],
  providers: [],
})
export class AppsModule { }
