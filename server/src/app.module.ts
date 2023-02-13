import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import mongoose from 'mongoose';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  // 로깅 미들웨어 등록
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // * = 전체 엔드포인트에 loggerMiddleware적용
    mongoose.set('debug', this.isDev);
  }
}
