import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { UserGameData } from './interface/userData.interface';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  // 유저 정보 요청
  async getUserInfo(name: string) {
    const url: string = 'https://kr.api.riotgames.com';
    const userData = await axios.get(
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
  async getLeagueInfo(cryptoId: string) {
    const url: string = 'https://kr.api.riotgames.com';
    const leagueInfo = await axios.get(
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
  async matchId(puuid: string) {
    const url: string = 'https://asia.api.riotgames.com';
    const matchData = await axios.get(
      `${url}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10
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
  async gameInfo(data: any[]) {
    const matchId: string[] = data[0];
    const userName = data[1];
    const gameMetaData: any = [];
    console.log('data: ', data);
    let playData: any[];
    let userMetaData: UserGameData;
    const url: string = 'https://asia.api.riotgames.com';
    for (let i = 0; i < matchId.length; i++) {
      const gameInfo = await axios.get(
        `${url}/lol/match/v5/matches/${matchId[i]}`,
        {
          headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
          },
        },
      );
      gameMetaData.push(gameInfo.data);
      playData = gameMetaData[i].info.participants;
    }
    for (let i = 0; i < playData.length; i++) {
      if (playData[i].summonerName === userName) {
        const userData = playData[i];
        // console.log('userData: ', userData);
        userMetaData = {
          champLevel: userData.champLevel,
          championId: userData.championId,
          championName: userData.championName,
          firstBloodKill: userData.firstBloodKill,
          item0: userData.item0,
          item1: userData.item1,
          item2: userData.item2,
          item3: userData.item3,
          item4: userData.item4,
          item5: userData.item5,
          item6: userData.item6,
          summonerName: userData.summonerName,
          summonerLevel: userData.summonerLevel,
          teamId: userData.teamId,
          teamPosition: userData.teamPosition,
          win: userData.win,
          totalDamageDealt: userData.totalDamageDealt,
          kda: userData.challenges.kda,
          kills: userData.kills,
          deaths: userData.deaths,
          assists: userData.assists,
          soloKills: userData.challenges.soloKills,
          doubleKills: userData.doubleKills,
          pentaKills: userData.pentaKills,
          tripleKills: userData.tripleKills,
          totalDamageDealtToChampions: userData.totalDamageDealtToChampions,
          totalDamageTaken: userData.totalDamageTaken,
        };
      }
    }
    return [userMetaData];
  }
}
