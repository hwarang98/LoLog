import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { LoggerMiddleware } from './logger.middleware';

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
    MongooseModule.forRoot(process.env.MONGO_URL),
    // SummonerModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  // 로깅 미들웨어 등록
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
