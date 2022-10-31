import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Summoner, SummonerSchema } from 'src/schema/summoner.schema';
import { CatsRepository } from './api.repository';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Summoner.name, schema: SummonerSchema },
    ]),
  ],
  providers: [ApiService, CatsRepository],
  controllers: [ApiController],
})
export class ApiModule {}
