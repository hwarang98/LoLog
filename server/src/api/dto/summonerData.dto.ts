export interface SummonerData {
  summonerName?: string;
  summonerGameData?: object[];
}

export interface SummonerGameData {
  gameStartDate?: string;
  gameEndDate?: string;
  gameDuration?: string;
  gameType?: string;
  summonerName?: string;
  summonerLevel?: number;
  teamId?: number;
  championName?: string;
  champLevel?: number;
  kills?: number;
  deaths?: number;
  assists?: number;
  challenges?: { kda: number; jungleMonsterKill: number };
  minionsKill: number;
  jungleMonsterKill: number;
  totalCs: number;
  item0?: number;
  item1?: number;
  item2?: number;
  item3?: number;
  item4?: number;
  item5?: number;
  item6?: number;
  spell1Casts?: number;
  spell2Casts?: number;
  spell3Casts?: number;
  spell4Casts?: number;
  lane?: string;
  role?: string;
  pinkWard?: number;
  team?: string;
  win?: boolean;
}
