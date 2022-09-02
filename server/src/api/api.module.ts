import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Summoner, SummonerSchema } from 'src/schema/summoner.schema';
// import { Summoner, SummonerSchema } from '../schema/summoner.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature(
      [{ name: Summoner.name, schema: SummonerSchema }],
      // 'summoner',
    ),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
