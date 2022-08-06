import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { UserInfo } from './interface/user.interface';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  // 유저 정보 요청
  async getUserInfo(name: string): Promise<AxiosResponse> {
    const url: string = 'https://kr.api.riotgames.com';
    const userData = await this.httpService.axiosRef.get(
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

  // 리그정보 요청
  async getLeagueInfo(cryptoId: string): Promise<AxiosResponse> {
    const url: string = 'https://kr.api.riotgames.com';
    const leagueInfo = await this.httpService.axiosRef.get(
      `${url}/lol/league/v4/entries/by-summoner/${cryptoId}`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      },
    );
    return leagueInfo.data;
  }

  // 게임 매칭 id 요청
  async matchId(puuid: string): Promise<AxiosResponse> {
    const url: string = 'https://asia.api.riotgames.com';
    const matchData = await this.httpService.axiosRef.get(
      `${url}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1
      `,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY,
        },
      },
    );
    return matchData.data;
  }

  // 게임정보 요청
  async gameInfo(matchId: string[]): Promise<AxiosResponse> {
    const test: any = [];
    const url: string = 'https://asia.api.riotgames.com';
    for (let i = 0; i < matchId.length; i++) {
      const gameInfo = await this.httpService.axiosRef.get(
        `${url}/lol/match/v5/matches/${matchId[i]}`,
        {
          headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
          },
        },
      );
      test.push(gameInfo.data);
    }

    // for (let i = 0; i < 100; i++) {
    //   console.log(test[i].info.participants[i]) ;
    // }
    return test;
  }
}
