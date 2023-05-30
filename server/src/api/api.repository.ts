import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Summoner } from 'src/schema/summoner.schema';
import { SummonerData } from './dto/summonerData.dto';

//데이터베이스 중앙 처리실 (미들웨어랑 비슷한 개념)
@Injectable()
export class SummonerRepository {
  constructor(@InjectModel(Summoner.name) private readonly Summoner: Model<Summoner>) {}

  /**
   *
   * @param data dto를 거친 api data
   * @설명 게임정보 저장
   */
  async gameInfoSave(data: SummonerData) {
    try {
      const name = data.summonerName;
      const gameData = data.summonerGameData;

      return await this.Summoner.create({ summonerName: name, summonerGameData: gameData });
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }

  /**
   *
   * @param summonerName string 문자열
   * @returns 해당 유저의 게임 데이터
   */
  async getGameData(summonerName: SummonerData) {
    try {
      if (typeof summonerName !== 'string') {
        return null;
      }

      return await this.Summoner.findOne({ summonerName: summonerName }, { _id: 0, summonerGameData: 1 }).lean();
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }

  /**
   *
   * @param summonerName string 문자열
   * @returns 해당 유저의 게임 데이터
   */
  async getMatchIdsBySummonerName(summonerName: SummonerData) {
    try {
      if (typeof summonerName !== 'string') {
        return null;
      }

      const result = await this.Summoner.findOne(
        { summonerName: summonerName },
        { _id: 0, 'summonerGameData.metadata.matchId': 1 },
      ).lean();

      return result ? result.summonerGameData : null;
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }

  /**
   *
   *
   * @param name string 문자열
   * @returns 해당 유저의 게임 메타데이터 정보
   */
  async getGameMetaData(name: SummonerData) {
    try {
      const summonerName = name.summonerName;
      if (typeof summonerName !== 'string') {
        return null;
      }

      return await this.Summoner.findOne(
        { summonerName: summonerName },
        'summonerGameData.metadata.participants',
      ).lean();
    } catch (error) {
      throw new HttpException('소환사가 없습니다.', 400);
    }
  }

  /**
   *
   * @param summonerName 문자열 타입의 소환사이름
   * @returns 소환사 _id 반환
   */
  async isCheckSummonerName(summonerName: string): Promise<object> {
    try {
      const result = await this.Summoner.exists({ summonerName: summonerName });
      return result;
    } catch (error) {
      throw new HttpException('소환사가 이미 존재합니다.', 400);
    }
  }
}
