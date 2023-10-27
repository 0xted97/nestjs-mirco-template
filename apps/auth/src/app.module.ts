import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configuration } from '@app/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
      load: [configuration],
    }),
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
export class AppModule {}
