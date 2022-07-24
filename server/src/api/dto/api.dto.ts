import { IsString } from 'class-validator';

export class ApiDto {
  @IsString()
  readonly userInfo: string;
}
