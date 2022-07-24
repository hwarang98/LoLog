import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getSummoner(): string {
    return 'Hello Riot!';
  }
}
