import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummonerDocument = Summoner & Document;

@Schema()
export class Summoner {
  @Prop({ required: true })
  summonerName: string;

  // @Prop({ required: true })
  // summonerGameDatas: string;
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
