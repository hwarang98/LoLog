import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { SummonerRepository } from './api.repository';
import { SummonerGameData, SummonerSpellDTO } from './dto/summonerData.dto';
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

      const gameType = (gameQueueId: number) => {
        switch (gameQueueId) {
          case 420:
            return '솔랭';
          case 430:
            return '일반게임';
          case 440:
            return '자유랭크';
          case 450:
            return '칼바람';
          default:
            return '일반게임';
        }
      };

      // db에 저장된 정보가 없을때
      if (!isCheckSummonerName) {
        const gameData = await Promise.all(
          _.map(matchId, async (data: string) => {
            const gameInfo = await axios.get(`${this.RIOT_ASIA_URL}/lol/match/v5/matches/${data}`, {
              headers: this.header,
            });
            return gameInfo.data;
          }),
        );

        await this.summonerRepository.gameInfoSave({ summonerName: summonerName, summonerGameData: gameData });

        // 필요한 게임 데이터 정보 리턴하는 함수
        const summonerGameDataList = _.flatMap(gameData, (data: any) => {
          const gameDataList = data.info.participants;
          const gameStartDate = moment(data.info.gameStartTimestamp).format('YYYY-MM-DD HH:mm:ss');
          const gameEndDate = moment(data.info.gameEndTimestamp).format('YYYY-MM-DD HH:mm:ss');
          const gameDuration = moment.utc(moment(gameEndDate).diff(gameStartDate)).format('mm:ss');

          return _.map(gameDataList, (game: SummonerGameData) => {
            const summonerGameData = {
              gameStartDateTimeStamp: data.info.gameStartTimestamp,
              gameEndDateTimeStamp: data.info.gameEndTimestamp,
              gameDuration,
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
              summoner1Casts: game.summoner1Casts,
              summoner1Id: game.summoner1Id,
              summoner2Casts: game.summoner2Casts,
              summoner2Id: game.summoner2Id,
              lane: game.teamPosition,
              pinkWard: game.visionWardsBoughtInGame,
              team: game.teamId === 100 ? '블루팀' : '레드팀',
              win: game.win,
            };
            return summonerGameData;
          });
        });

        const sortedArr = summonerGameDataList.sort((a, b) => b.gameStartDateTimeStamp - a.gameStartDateTimeStamp);
        return sortedArr;
      }

      // db에 정보가 있을때 시작
      const [getGameData, getMatchIds] = await Promise.all([
        this.summonerRepository.getGameData(summonerName),
        this.summonerRepository.getMatchIdsBySummonerName(summonerName),
      ]);

      const myMatchIdList = _.map(getMatchIds, 'metadata.matchId');
      const differencesMatchIdList = _.xor(matchId, myMatchIdList);
      // if (differencesMatchIdList.length !== 0) {
      const gameData = await Promise.all(
        _.map(differencesMatchIdList, async (data: string) => {
          const gameInfo = await axios.get(`${this.RIOT_ASIA_URL}/lol/match/v5/matches/${data}`, {
            headers: this.header,
          });
          return gameInfo.data;
        }),
      );

      const finalData = _.flatMap(getGameData.summonerGameData, (data) => {
        const gameDataList = data.info.participants;
        const gameStartDate = moment(data.info.gameStartTimestamp).format('YYYY-MM-DD HH:mm:ss');
        const gameEndDate = moment(data.info.gameEndTimestamp).format('YYYY-MM-DD HH:mm:ss');

        // 게임 진행시간 구하는 함수
        const gameDuration = moment.utc(moment(gameEndDate).diff(gameStartDate)).format('mm:ss');

        return _.map(gameDataList, (game: SummonerGameData) => ({
          gameStartDateTimeStamp: data.info.gameStartTimestamp,
          gameEndDateTimeStamp: data.info.gameEndTimestamp,
          gameDuration,
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
          summoner1Casts: game.summoner1Casts,
          summoner1Id: game.summoner1Id,
          summoner2Casts: game.summoner2Casts,
          summoner2Id: game.summoner2Id,
          line: game.teamPosition,
          pinkWard: game.visionWardsBoughtInGame,
          team: game.teamId === 100 ? '블루팀' : '레드팀',
          win: game.win,
        }));
      });

      const sortedArr = finalData.sort((a, b) => b.gameStartDateTimeStamp - a.gameStartDateTimeStamp);

      return sortedArr;
      // }
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }

  /**
   *
   * @param spell 문자열 타입 spell
   * @returns 게임 매칭 ID
   */
  async getSummonerSpell(spell: [number]) {
    try {
      const { data } = await axios.get(`http://ddragon.leagueoflegends.com/cdn/13.7.1/data/ko_KR/summoner.json`, {
        headers: this.header,
      });

      const spellKey = _.reduce(
        data.data,
        (acc: any[], item: SummonerSpellDTO) => {
          const itemkey = Number(item.key);
          if (_.includes(spell, itemkey)) {
            acc.push(item.image);
          }
          return acc;
        },
        [],
      );

      return spellKey;
    } catch (error) {
      throw new HttpException('소환사의 puuid를 확인해주세요.', 400);
    }
  }
}

// teamId 200 = 레드팀
// teamId 100 = 블루팀
