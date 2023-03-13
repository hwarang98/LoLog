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
  async getUserInfo(summonerName: string) {
    try {
      const userData = await axios.get(
        `${this.RIOT_URL}/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}?api_key=${this.RIOT_API_KEY}`,
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
  async getMatchId(puuid: string): Promise<any> {
    try {
      const header = { headers: this.header };
      const matchData = await axios.get(
        `${this.RIOT_ASIA_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
        header,
      );
      return matchData.data;
    } catch (error) {
      throw new HttpException('소환사의 puuid를 확인해주세요.', 400);
    }
  }

  /**
   * 소환사 이름을 받아 게임 정보를 반환해주는 함수
   * @param {object} data - object안에 **summonerName, matchId**가 있어야하면 각각 string, array[stirng] 타입
   * @returns {[object]} 게임정보
   */
  async getGameDataForSummonerName(data: any) {
    try {
      const { summonerName, matchId } = data;

      const isCheckSummonerName = await this.summonerRepository.isCheckSummonerName(summonerName);

      if (!isCheckSummonerName) {
        const [gameData] = await Promise.all([
          Promise.all(
            _.map(matchId, async (data: string) => {
              const gameInfo = await axios.get(`${this.RIOT_ASIA_URL}/lol/match/v5/matches/${data}`, {
                headers: this.header,
              });
              return gameInfo.data;
            }),
          ),
        ]);

        await this.summonerRepository.gameInfoSave({ summonerName: summonerName, summonerGameData: gameData });

        const summonerGameDataList = [];
        _.each(gameData, (data: any) => {
          const gameDataList = data.info.participants;
          const gameStartDate = moment(data.info.gameStartTimestamp).format('YYYY-MM-DD HH:mm:ss');
          const gameEndDate = moment(data.info.gameEndTimestamp).format('YYYY-MM-DD HH:mm:ss');

          const gameDurationMinute = moment.duration(moment(gameEndDate).diff(gameStartDate)).minutes();
          const gameDurationSecond = moment.duration(moment(gameEndDate).diff(gameStartDate)).seconds();

          const gameType = (gameQueueId: number) => {
            switch (gameQueueId) {
              case 420:
                return '솔랭';

              case 430:
                return '일반게임';

              case 440:
                return '자유랭크';

              default:
                return '일반게임';
            }
          };

          _.each(gameDataList, (game: SummonerGameData) => {
            return summonerGameDataList.push({
              gameStartDateTimeStamp: data.info.gameStartTimestamp,
              gameEndDateTimeStamp: data.info.gameEndTimestamp,
              gameDuration: `${gameDurationMinute}:${gameDurationSecond}`,
              gameType: gameType(data.info.queueId),
              summonerName: game.summonerName,
              summonerId: game.summonerId,
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
              lane: game.teamPosition,
              pinkWard: game.visionWardsBoughtInGame,
              team: game.teamId === 100 ? '블루팀' : '레드팀',
              win: game.win,
            });
          });
        });

        const sortedArr = summonerGameDataList.sort((a, b) => b.gameStartDateTimeStamp - a.gameStartDateTimeStamp);
        return sortedArr;
      }

      const [gameData] = await Promise.all([this.summonerRepository.getGameData(summonerName)]);

      const finalData = [];
      _.map(gameData.summonerGameData, (data: any) => {
        const gameDataList = data.info.participants;
        const gameStartDate = moment(data.info.gameStartTimestamp).format('YYYY-MM-DD HH:mm:ss');
        const gameEndDate = moment(data.info.gameEndTimestamp).format('YYYY-MM-DD HH:mm:ss');

        const gameDurationMinute = moment.duration(moment(gameEndDate).diff(gameStartDate)).minutes();
        const gameDurationSecond = moment.duration(moment(gameEndDate).diff(gameStartDate)).seconds();

        const gameType = (gameQueueId: number) => {
          switch (gameQueueId) {
            case 420:
              return '솔랭';

            case 430:
              return '일반게임';

            case 440:
              return '자유랭크';

            default:
              return '일반게임';
          }
        };
        //SummonerGameData

        _.each(gameDataList, (game: SummonerGameData) => {
          // if (game.summonerName === '소라카가 가요') {
          //   console.log('game.visionWardsBoughtInGame: ', game.visionWardsBoughtInGame);
          //   console.log('game.wardsKilled: ', game.wardsKilled);
          //   console.log('detectorWardsPlaced: ', game.detectorWardsPlaced);
          //   console.log('sightWardsBoughtInGame: ', game.sightWardsBoughtInGame);
          //   console.log('wardsPlaced: ', game.wardsPlaced);
          // }
          return finalData.push({
            gameStartDateTimeStamp: data.info.gameStartTimestamp,
            gameEndDateTimeStamp: data.info.gameEndTimestamp,
            gameDuration: `${gameDurationMinute}:${gameDurationSecond}`,
            gameType: gameType(data.info.queueId),
            summonerName: game.summonerName,
            summonerId: game.summonerId,
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
            lane: game.teamPosition,
            pinkWard: game.visionWardsBoughtInGame,
            team: game.teamId === 100 ? '블루팀' : '레드팀',
            win: game.win,
          });
        });
      });

      const sortedArr = finalData.sort((a, b) => b.gameStartDateTimeStamp - a.gameStartDateTimeStamp);

      return sortedArr;
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }

  /**
   *
   * @param spell 문자열 타입 spell
   * @returns 게임 매칭 ID
   */
  async getSummonerSpell(spell: number) {
    try {
      const { data } = await axios.get(`https://ddragon.leagueoflegends.com/cdn/13.4.1/data/ko_KR/summoner.json`, {
        headers: this.header,
      });

      const test = _.map(data.data, (item) => {
        console.log(item.key);
      });
      return data;
    } catch (error) {
      throw new HttpException('소환사의 puuid를 확인해주세요.', 400);
    }
  }
}

// teamId 200 = 레드팀
// teamId 100 = 블루팀
