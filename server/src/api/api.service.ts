import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
// import { UserInfo } from './interface/user.interface';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  // 유저 정보 요청
  async getUserInfo(name: string): Promise<AxiosResponse> {
    const url: string = 'https://kr.api.riotgames.com';
    let userData = await this.httpService.axiosRef.get(
      `${url}/lol/summoner/v4/summoners/by-name/${encodeURI(name)}?api_key=${
        process.env.RIOT_API_KEY
      }`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      },
    );
    return userData.data;
  }

  // 게임 매칭 id 요청
  async matchId(puuid: string): Promise<AxiosResponse> {
    const url: string = 'https://asia.api.riotgames.com';
    let matchData = await this.httpService.axiosRef.get(
      `${url}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20
      `,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
        withCredentials: true,
      },
    );
    return matchData.data;
  }
}
