import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('riot api')
@Controller('api')
export class ApiController {
  constructor(private ApiService: ApiService) {}

  @Post('userInfo')
  getMatch(@Body('name') name: string) {
    return this.ApiService.getUserInfo(name);
  }

  @Post('matchInfo')
  getUser(@Body('puuid') puuid: string) {
    return this.ApiService.matchId(puuid);
  }
}
