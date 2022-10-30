import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { throwError } from 'rxjs';
import { Summoner } from 'src/schema/summoner.schema';
import { UserGameData } from './dto/userData.dto';

//데이터베이스 중앙 처리실 (미들웨어랑 비슷한 개념)
@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Summoner.name) private readonly summonerModel: Model<Summoner>,
  ) {}

  async isCheckSummonerName(summonerName: string): Promise<object> {
    try {
      const result = await this.summonerModel.exists({ summonerName });
      return result;
    } catch (error) {
      throw new HttpException('소환사가 이미 존재합니다.', 400);
    }
  }

  async gameInfoSave(data: UserGameData) {
    return this.summonerModel.create(data);
  }
}
