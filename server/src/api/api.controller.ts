import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiDto } from './dto/api.dto';
import axios from 'axios';

@Controller('api')
export class ApiController {
  private readonly URL: string = 'https://kr.api.riotgames.com';

  @Get()
  getSummoner() {
    return 'hello riot api!!!';
  }

  @Post()
  getUser(@Body() userInfo: ApiDto) {
    console.log('userInfo: ', userInfo);
    const name = userInfo;
    axios
      .get(
        `${URL}/lol/summoner/v4/summoners/by-name/돌면킬?api_key=${process.env.RIOT_API_KEY}`,
        {
          headers: {
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept-Charset':
              'application/x-www-form-urlencoded; charset=UTF-8',
            Origin: 'https://developer.riotgames.com',
            'X-Riot-Token': `${process.env.RIOT_API_KEY}`,
          },
          withCredentials: true,
        },
      )
      .then((data) => console.log('data: ', data));
    return `success`;
  }
}
