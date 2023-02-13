import { Module, NestModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Summoner, SummonerSchema } from 'src/schema/summoner.schema';
import { SummonerRepository } from './api.repository';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: Summoner.name, schema: SummonerSchema }])],
  providers: [ApiService, SummonerRepository],
  controllers: [ApiController],
})
export class ApiModule {}
