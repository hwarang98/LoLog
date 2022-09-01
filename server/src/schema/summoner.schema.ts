import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummonerDocument = Summoner & Document;

@Schema()
export class Summoner {
  @Prop({ unique: true })
  summonerName: string;

  // @Prop()
  // summonerInfo: string;

  // @Prop()
  // summonerGameInfo: string;

  // @Prop()
  // search: boolean;
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
