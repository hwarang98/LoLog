import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
