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
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  line: string;
  teamPosition: string;
  visionWardsBoughtInGame: number;
  team: string;
  win: boolean;
}

interface ImageDTO {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SummonerSpellDTO {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: any;
  effect: (number[] | null)[];
  effectBurn: (string | null)[];
  vars: any[];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: ImageDTO;
}
