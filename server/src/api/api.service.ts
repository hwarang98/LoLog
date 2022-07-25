import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async getUserInfo(name: string): Promise<any> {
    const url: string = 'https://kr.api.riotgames.com';
    console.log('유저 정보 요청');
    console.log('닉네임: ', name);
    const result = await this.httpService.get(
      `${url}/lol/summoner/v4/summoners/by-name/${encodeURI(name)}?api_key=${
        process.env.RIOT_API_KEY
      }`,
      {
        headers: {
          'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
          Origin: 'https://developer.riotgames.com',
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      },
    );
    // .toPromise();
    return result;
  }
}
