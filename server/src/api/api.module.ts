import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Summoner, SummonerSchema } from 'src/schema/summoner.schema';
import { CatsRepository } from './api.repository';
// import { Summoner, SummonerSchema } from '../schema/summoner.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Summoner.name, schema: SummonerSchema },
    ]),
  ],
  controllers: [ApiController, CatsRepository],
  providers: [ApiService],
})
export class ApiModule {}
