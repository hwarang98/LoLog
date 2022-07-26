import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { Summoner, SummonerDocument } from '../schema/summoner.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SummonerRepository } from './api.repository';

@Injectable()
export class ApiService {
  constructor(private readonly summonerRepository: SummonerRepository) {}
  private readonly logger = new Logger(ApiService.name);
  RIOT_URL = process.env.RIOT_URL;
  RIOT_ASIA_URL = process.env.RIOT_ASIA_URL;
  RIOT_API_KEY = process.env.RIOT_API_KEY;
  header = { 'X-Riot-Token': this.RIOT_API_KEY };

  /**
   *
   * @param name 문자열 타입 소환사 이름
   * @returns 소환사 이름의 정보
   */
  async getUserInfo(name: string) {
    this.logger.log('유저 정보 요청');
    const userData = await axios.get(
      `${this.RIOT_URL}/lol/summoner/v4/summoners/by-name/${encodeURI(
        name,
      )}?api_key=${this.RIOT_API_KEY}`,
      {
        headers: this.header,
      },
    );
    return userData.data;
  }

  /**
   *
   * @param cryptoId 해쉬화된 유저 ID
   * @returns 유저 프로필 정보
   */
  async getLeagueInfo(id: string) {
    this.logger.log('리그정보 요청');
    const leagueInfo = await axios.get(
      `${this.RIOT_URL}/lol/league/v4/entries/by-summoner/${id}`,
      {
        headers: this.header,
      },
    );
    return leagueInfo.data;
  }

  /**
   *
   * @param puuid 문자열 타입 PUUID
   * @returns 게임 매칭 ID
   */
  async matchId(puuid: string) {
    this.logger.log('게임 매칭 id 조회 요청');

    const matchData = await axios.get(
      `${this.RIOT_ASIA_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10
      `,
      {
        headers: this.header,
      },
    );
    return matchData.data;
  }

  /**
   *
   * @param data api data
   * @returns 유저 정보
   */
  async gameInfo(data: any) {
    this.logger.log('게임정보 요청');
    const matchId = data.matchId;
    const userName: string = data.name;
    if (this.summonerRepository.isCheckSummonerName(userName)) {
      console.log('아이디있음~');
    }
    for (let i = 0; i < matchId.length; i++) {
      const gameInfo = await axios.get(
        `${this.RIOT_ASIA_URL}/lol/match/v5/matches/${matchId[i]}`,
        {
          headers: this.header,
        },
      );
      const userInfoSave = await this.summonerRepository.gameInfoSave({
        summonerName: userName,
        summonerGameData: gameInfo.data,
      });
      console.log(userInfoSave);
      return userInfoSave;
    }
  }
}
