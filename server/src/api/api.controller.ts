import { Controller, Post, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
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
  async getUser(@Body('name') name: string) {
    this.myLogger.log(`${name}님의 정보 조회중...`);
    return this.ApiService.getUserInfo(name);
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

  @Post('game/info/matchId')
  @ApiOperation({
    summary: '게임정보 저장 API',
    description: 'matchInfo API에서 요청한 matchId를 사용해 해당 게임 정보조회',
  })
  async getGameInfo(@Body('data') data: string[]) {
    this.myLogger.log(`게임정보 조회중...`);
    return this.ApiService.getGameInfoForMatchId(data);
  }

  @Post('game/info/summoner/name')
  @ApiOperation({
    summary: '게임정보 조회 API',
    description: '소환사 이름으로 게임정보 조회 API',
  })
  async gameInfo(@Body('name') name: string) {
    this.myLogger.log(`${name}의 게임정보 조회중...`);
    return this.ApiService.getGameDataForSummonerName(name);
  }
}
