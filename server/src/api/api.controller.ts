import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('riot api')
@Controller('api')
export class ApiController {
  constructor(private ApiService: ApiService) {}

  @Post('/summoner')
  async getMatch(@Body('name') name: string): Promise<any> {
    return this.ApiService.getUserInfo(name);
  }

  @Post()
  getUser(@Body() userInfo: string) {
    return `success`;
  }
}
