import { configuration } from '@app/common';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class CustomConfigModule {
  static register(): DynamicModule {
    return ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development'],
      load: [configuration],
    })
  }
}