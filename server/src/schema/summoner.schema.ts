import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type SummonerDocument = Summoner & Document;

@Schema({ versionKey: false })
export class Summoner {
  @ApiProperty({
    example: '징징대면달라지나',
    description: '소환사 이름',
  })
  @Prop({ required: true })
  @IsNotEmpty()
  summonerName: string;

  @ApiProperty({})
  @Prop({})
  @IsNotEmpty()
  summonerGameData: object[];
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
