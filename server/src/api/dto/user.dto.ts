import { IsString } from 'class-validator';

export class GithubCodeDto {
  @IsString()
  readonly userName: string;
}
