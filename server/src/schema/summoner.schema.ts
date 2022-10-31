import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Mixed, ObjectExpression, ObjectId } from 'mongoose';

export type SummonerDocument = Summoner & Document;

@Schema()
export class Summoner {
  @ApiProperty({
    example: '돌면킬',
    description: '소화사 이름',
  })
  @Prop({ required: true })
  summonerName: string;

  // @ApiProperty({})
  @Prop({})
  summonerGameData: [object];
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
