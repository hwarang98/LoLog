import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
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
    try {
      this.logger.log('유저 정보 요청');
      const userData = await axios.get(
        `${this.RIOT_URL}/lol/summoner/v4/summoners/by-name/${encodeURI(name)}?api_key=${this.RIOT_API_KEY}`,
        {
          headers: this.header,
        },
      );
      return userData.data;
    } catch (error) {
      throw new HttpException('소환사를 찾을수 없습니다!', 400);
    }
  }

  /**
   *
   * @param cryptoId 해쉬화된 유저 ID
   * @returns 유저 프로필 정보
   */
  async getLeagueInfo(id: string) {
    try {
      this.logger.log('리그정보 요청');
      const leagueInfo = await axios.get(`${this.RIOT_URL}/lol/league/v4/entries/by-summoner/${id}`, {
        headers: this.header,
      });
      return leagueInfo.data;
    } catch (error) {
      throw new HttpException('accountId를 확인해주세요.', 400);
    }
  }

  /**
   *
   * @param puuid 문자열 타입 PUUID
   * @returns 게임 매칭 ID
   */
  async getMatchId(puuid: string) {
    try {
      this.logger.log('게임 매칭 id 조회 요청');

      const matchData = await axios.get(
        `${this.RIOT_ASIA_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
        {
          headers: this.header,
        },
      );
      return matchData.data;
    } catch (error) {
      throw new HttpException('소환사의 puuid를 확인해주세요.', 400);
    }
  }

  /**
   *
   * @param data api data
   * @returns 유저 정보
   */
  async getGameInfoForMatchId(data: any) {
    this.logger.log('게임정보 요청');
    const { matchId, name } = data;
    const isCheckSummonerName = await this.summonerRepository.isCheckSummonerName(name);

    const summonerGameData: any = [];
    if (!isCheckSummonerName) {
      for (let i = 0; i < matchId.length; i++) {
        const gameInfo = await axios.get(`${this.RIOT_ASIA_URL}/lol/match/v5/matches/${matchId[i]}`, {
          headers: this.header,
        });
        summonerGameData.push(gameInfo.data);
      }

      await this.summonerRepository.gameInfoSave({ summonerName: name, summonerGameData: summonerGameData });
    }

    return { summonerName: name, summonerGameData: summonerGameData };
  }

  async getGameDataForSummonerName(summonerName: string) {
    try {
      const gameData = await this.summonerRepository.getGameData({ summonerName });
      return gameData;
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }
}
