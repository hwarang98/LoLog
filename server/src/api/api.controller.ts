import { Controller, Post, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { MyLogger } from 'src/common/middlewares/logger.middleware';

@ApiTags('riot api')
@Controller('api')
export class ApiController {
  constructor(private ApiService: ApiService) {}
  private readonly myLogger = new MyLogger(ApiController.name);

  @Post('summoner/info')
  @ApiOperation({
    summary: '유저정보 조회 API',
    description: '소환사 이름을 사용한 해당 유저 정보 조회',
  })
  @ApiCreatedResponse({ status: 200, description: '소환사의 정보조회' })
  @ApiCreatedResponse({ status: 403, description: 'riot api 토큰 갱신 필요' })
  async getUser(@Body('summonerName') summonerName: string) {
    this.myLogger.log(`${summonerName} 님의 정보 조회중...`);

    return this.ApiService.getUserInfo(summonerName);
  }

  @Post('league/info')
  @ApiOperation({
    summary: '리그정보 조회 API',
    description: '암호화된 소환사 아이디를 사용한 해당 소환사 리그정보 조회',
  })
  async getLeague(@Body('id') id: string) {
    this.myLogger.log(`리그정보 조회중...`);
    return this.ApiService.getLeagueInfo(id);
  }

  @Post('match/info')
  @ApiOperation({
    summary: '게임 matchId 조회 API',
    description: 'userInfo API 에서 요청받은 항목중 puuid를 사용한 게임 매칭 ID조회',
  })
  async getMatch(@Body('puuid') puuid: string) {
    this.myLogger.log(`게임 매칭 ID조회중...`);
    return this.ApiService.getMatchId(puuid);
  }

  @Post('game/info')
  @ApiOperation({
    summary: '게임정보 조회 API',
    description: '소환사 이름으로 게임정보 조회 API',
  })
  async gameInfo(@Body('data') data: any) {
    this.myLogger.log(`${data.summonerName}의 게임정보 조회중...`);
    return this.ApiService.getGameDataForSummonerName(data);
  }

  @Post('summoner/spell')
  @ApiOperation({
    summary: '게임정보 조회 API',
    description: '소환사 이름으로 게임정보 조회 API',
  })
  async summonerSpell(@Body('spell') spell: [number]) {
    this.myLogger.log(`${spell}의 spell 조회중...`);
    return this.ApiService.getSummonerSpell(spell);
  }
}
