import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Summoner } from 'src/schema/summoner.schema';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Summoner.name) private readonly catModel: Model<Summoner>,
  ) {}
  async gameInfoSave() {
    return 'gameInfoSave';
  }
}
