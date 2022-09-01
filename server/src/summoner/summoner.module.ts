import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';

@Module({
  providers: [SummonerService]
})
export class SummonerModule {}
