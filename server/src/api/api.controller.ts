import { Controller, Get, Param, Post, Body, HttpStatus, HttpException, Patch } from '@nestjs/common';
import { ApiService } from './api.service';
import { Summoner } from 'src/schema/summoner.schema';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SummonerData } from './dto/summonerData.dto';
import { response } from 'express';

@ApiTags('riot api')
@Controller('api')
export class ApiController {
  constructor(private ApiService: ApiService) {}

  @Post('getUserInfo')
  @ApiOperation({
    summary: '유저정보 조회 API',
    description: '소환사 이름을 사용한 해당 유저 정보 조회',
  })
  async getUser(@Body('name') name: string) {
    // throw new HttpException('소환사를 찾을수 없습니다.', 404);
    return this.ApiService.getUserInfo(name);
  }

  @Post('getLeagueInfo')
  @ApiOperation({
    summary: '리그정보 조회 API',
    description: '암호화된 소환사 아이디를 사용한 해당 소환사 리그정보 조회',
  })
  async getLeague(@Body('id') id: string) {
    return this.ApiService.getLeagueInfo(id);
  }

  @Post('matchInfo')
  @ApiOperation({
    summary: '게임 matchId 조회 API',
    description: 'userInfo API 에서 요청받은 항목중 puuid를 사용한 게임 매칭 ID조회',
  })
  async getMatch(@Body('puuid') puuid: string) {
    return this.ApiService.matchId(puuid);
  }

  @Post('gameInfo')
  @ApiOperation({
    summary: '게임정보 조회 API',
    description: 'matchInfo API에서 요청한 matchId를 사용해 해당 게임 정보조회',
  })
  async getGameInfo(@Body('data') data: string[]) {
    return this.ApiService.gameInfo(data);
  }
}
