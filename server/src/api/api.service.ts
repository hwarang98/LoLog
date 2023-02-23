import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { SummonerRepository } from './api.repository';
import { SummonerGameData } from './dto/summonerData.dto';
import moment from 'moment';
import _ from 'lodash';

@Injectable()
export class ApiService {
  constructor(private readonly summonerRepository: SummonerRepository) {}

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
      const userData = await axios.get(
        `${this.RIOT_URL}/lol/summoner/v4/summoners/by-name/${encodeURI(name)}?api_key=${this.RIOT_API_KEY}`,
        {
          headers: this.header,
        },
      );
      return userData.data;
    } catch (error) {
      const errorCode = error.response.data.status.status_code;
      const errorMessage = errorCode === 400 ? '소환사를 찾을수 없습니다' : error.response.data.status.message;
      throw new HttpException(errorMessage, errorCode);
    }
  }

  /**
   *
   * @param cryptoId 해쉬화된 유저 ID
   * @returns 유저 프로필 정보
   */
  async getLeagueInfo(id: string) {
    try {
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

  /**
   * 소환사 이름을 받아 게임 정보를 반환해주는 함수
   * @param {string} summonerName 문자열 타입 소환사 이름
   * @returns {[object]} 유저 정보
   */
  async getGameDataForSummonerName(summonerName: string) {
    try {
      const [gameData] = await Promise.all([this.summonerRepository.getGameData({ summonerName })]);

      const finalData = [];
      _.map(gameData.summonerGameData, (data: any) => {
        const gameDataList = data.info.participants;
        const gameStartDate = moment(data.info.gameStartTimestamp).format('YYYY-MM-DD HH:mm:ss');
        const gameEndDate = moment(data.info.gameEndTimestamp).format('YYYY-MM-DD HH:mm:ss');

        const gameDurationMinute = moment.duration(moment(gameEndDate).diff(gameStartDate)).minutes();
        const gameDurationSecond = moment.duration(moment(gameEndDate).diff(gameStartDate)).seconds();

        const gameType = data.info.queueId === 420 ? '솔랭' : '자유랭크';

        _.each(gameDataList, (game: any) => {
          console.log(game);
          return finalData.push({
            gameStartDate: moment(data.info.gameStartTimestamp).format('YY/MM/DD'),
            gameEndDate: moment(data.info.gameEndTimestamp).format('YY/MM/DD'),
            gameDuration: `${gameDurationMinute}:${gameDurationSecond}`,
            gameType: gameType,
            summonerName: game.summonerName,
            summonerLevel: game.summonerLevel,
            teamId: game.teamId,
            championName: game.championName,
            champLevel: game.champLevel,
            kill: game.kills,
            death: game.deaths,
            assist: game.assists,
            kda: game.challenges.kda,
            minionsKill: game.totalMinionsKilled,
            jungleMonsterKill: game.neutralMinionsKilled,
            totalCs: game.totalMinionsKilled + game.neutralMinionsKilled,
            item0: game.item0,
            item1: game.item1,
            item2: game.item2,
            item3: game.item3,
            item4: game.item4,
            item5: game.item5,
            item6: game.item6,
            lane: game.lane === 'BOTTOM' ? game.role : game.lane,
            pinkWard: game.visionWardsBoughtInGame,
            team: game.teamId === 100 ? '블루팀' : '레드팀',
            win: game.win,
          });
        });

        // _.each(data.info.teams, (team) => {
        //   console.log(team);
        //   return finalData.push({});
        // });
      });

      return finalData;
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }
}

// teamId 200 = 레드팀
// teamId 100 = 블루팀
