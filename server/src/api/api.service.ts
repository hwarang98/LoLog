import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { UserGameData } from './dto/userData.dto';
import { Summoner, SummonerDocument } from '../schema/summoner.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CatsRepository } from './api.repository';

@Injectable()
export class ApiService {
  constructor(private readonly catsRepository: CatsRepository) {}
  // @InjectModel(Summoner.name)
  // private readonly summonerModel: Model<SummonerDocument>,
  private readonly logger = new Logger(ApiService.name);
  // 유저 정보 요청
  async getUserInfo(name: string) {
    this.logger.log('유저 정보 검사');
    const url = 'https://kr.api.riotgames.com';
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
    // this.create(userData.data);
    return userData.data;
  }

  // 리그정보 요청
  async getLeagueInfo(cryptoId: string) {
    this.logger.log('리그정보 요청');
    const url = 'https://kr.api.riotgames.com';
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
    this.logger.log('게임 매칭 id 조회 요청');
    const url = 'https://asia.api.riotgames.com';
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
    this.logger.log('게임정보 요청');
    const matchId = data.matchId;
    const userName: string = data.name;
    const gameMetaData: any[] = [];
    const url = 'https://asia.api.riotgames.com';
    for (let i = 0; i < matchId.length; i++) {
      const gameInfo = await axios.get(
        `${url}/lol/match/v5/matches/${matchId[i]}`,
        {
          headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
          },
        },
      );
      const userInfoSave = await this.catsRepository.gameInfoSave({
        summonerName: userName,
        // summonerGameDatas: gameInfo.data,
      });
      return userInfoSave;
    }
    // return this.userGameData;
  }
}
