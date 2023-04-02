export interface SummonerData {
  summonerName?: string;
  summonerGameData?: object[];
}

export interface SummonerGameData {
  gameStartDateTimeStamp: number;
  gameEndDateTimeStamp: number;
  gameDuration: string;
  gameType: string;
  summonerName: string;
  summonerId: string;
  summonerLevel: number;
  teamId: number;
  championName: string;
  champLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  challenges: { kda: number; jungleMonsterKill: number };
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  totalCs: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  line: string;
  teamPosition: string;
  visionWardsBoughtInGame: number;
  team: string;
  win: boolean;
}
