import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CustomConfigModule } from '@app/modules';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomConfigModule.register(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('mongoUri'),
        };
      },
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
