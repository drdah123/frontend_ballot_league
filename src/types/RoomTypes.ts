import { PLayerRoomSubType, TeamEnterRoomType } from './ApiTypes';
import { teamIds } from './playerType';
import { PlayingType } from './playingType';

export type GeneralPlayingType =
  | 'free'
  | 'limited'
  | 'جلسة حرة'
  | 'جلسة محدودة';
export type GeneralRoomType = 'public' | 'private' | 'عامة' | 'خاصة';

export type RoomSpeedType =
  | 'fast'
  | 'normal'
  | 'slow'
  | 'سريعة'
  | 'متوسطة'
  | 'بطيء';

export type AlnshraType = {
  playingType: PlayingType['playingType'];
  buyerTeam: teamIds;
  buyingResult: boolean;
  team1: AlnshraTeam;
  team2: AlnshraTeam;
  lastTeamEat: teamIds;
};

type AlnshraTeam = {
  eatingNum: number;
  almsharia: number;
  abnat: number;
  result: number;
};
export interface RoomSubType {
  _id: string;
  team1: TeamEnterRoomType;
  team2: TeamEnterRoomType;
  players: {
    firstPlayer: PLayerRoomSubType;
    secondPlayer: PLayerRoomSubType;
    thirdPlayer: PLayerRoomSubType;
    fourthPlayer: PLayerRoomSubType;
  };
}
