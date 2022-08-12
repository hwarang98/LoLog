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
  async gameInfo(data: any) {
    const matchId = data.matchId;
    const userName = data.name;
    const gameMetaData: any[] = [];
    const playData: any[] = [];
    let userMetaData: any[] = [];
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
      const playData = gameMetaData[i].info.participants;
      console.log('ㅋㅋㅋ: ', playData[i].challenges.kda);
      for (let i = 0; i < playData.length; i++) {
        if (playData[i].summonerName === userName) {
          userMetaData.push({
            champLevel: playData[i].champLevel,
            championId: playData[i].championId,
            championName: playData[i].championName,
            firstBloodKill: playData[i].firstBloodKill,
            item0: playData[i].item0,
            item1: playData[i].item1,
            item2: playData[i].item2,
            item3: playData[i].item3,
            item4: playData[i].item4,
            item5: playData[i].item5,
            item6: playData[i].item6,
            summonerName: playData[i].summonerName,
            summonerLevel: playData[i].summonerLevel,
            teamId: playData[i].teamId,
            teamPosition: playData[i].teamPosition,
            win: playData[i].win,
            totalDamageDealt: playData[i].totalDamageDealt,
            kda: playData[i].challenges.kda,
            kills: playData[i].kills,
            deaths: playData[i].deaths,
            assists: playData[i].assists,
            soloKills: playData[i].challenges.soloKills,
            doubleKills: playData[i].doubleKills,
            pentaKills: playData[i].pentaKills,
            tripleKills: playData[i].tripleKills,
            totalDamageDealtToChampions:
              playData[i].totalDamageDealtToChampions,
            totalDamageTaken: playData[i].totalDamageTaken,
          });
          // console.log(userMetaData);
        }
      }
    }
    return userMetaData;
  }
}
