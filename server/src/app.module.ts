import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
// import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'stage'
          ? '.stage.env'
          : '.env',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
