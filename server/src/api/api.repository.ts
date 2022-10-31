import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { throwError } from 'rxjs';
import { Summoner } from 'src/schema/summoner.schema';
import { SummonerData } from './dto/summonerData.dto';

//데이터베이스 중앙 처리실 (미들웨어랑 비슷한 개념)
@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Summoner.name) private readonly summonerModel: Model<Summoner>,
  ) {}

  /**
   *
   * @param summonerName 문자열 타입의 소환사이름
   * @returns 소환사 이름 반환
   */
  async isCheckSummonerName(summonerName: string): Promise<object> {
    try {
      const result = await this.summonerModel.exists({ summonerName });
      return result;
    } catch (error) {
      throw new HttpException('소환사가 이미 존재합니다.', 400);
    }
  }

  /**
   *
   * @param data dto를 거친 api data
   * @설명 api rawData를 몽고DB애 저장하는 함수
   */
  async gameInfoSave(data: SummonerData) {
    return this.summonerModel.create(data);
  }
}
