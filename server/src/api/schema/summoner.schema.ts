import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummonerDocument = Summoner & Document;

@Schema()
export class Summoner {
  @Prop()
  summonerName: string;

  @Prop()
  summonerInfo: string;

  @Prop()
  summonerGameInfo: string;

  @Prop()
  count: number;
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
