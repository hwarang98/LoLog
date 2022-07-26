import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserInfo } from './interface/user.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}
  async getUserInfo(name: string): Promise<AxiosResponse<UserInfo>> {
    console.log(`name is ${name}`);

    const url: string = 'https://kr.api.riotgames.com';
    return await this.httpService.axiosRef
      .get(
        `${url}/lol/summoner/v4/summoners/by-name/${encodeURI(name)}?api_key=${
          process.env.RIOT_API_KEY
        }`,
        {
          headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
          },
        },
      )
      .then((data) => {
        return data.data;
      });
  }
}
