import { LevelNames } from './ApiTypes';
import { MshariaPowerType } from './MshariaType';
import { Card, CardIds } from './cardTypes';

export type ManualMsharia = {
  id: number;
  MshariaPowerType: MshariaPowerType;
  cards: string[];
};

export interface PlayerType {
  teamId: teamIds;
  name: string;
  playOrder: PlayOrderType;
  cards: Card[];
  id: PlayersIDs;
  msharia: PlayerMshariaType | null;
  distributingOrder: PlayOrderType;
  sendMsharia: MshariaPowerType[];
  manualMsharia: ManualMsharia[];
  choseSkin: string;
  level: LevelNames;
  imageUri?: string;
}

export interface PlayersObjectType {
  firstPlayer: PlayerType;
  secondPlayer: PlayerType;
  thirdPlayer: PlayerType;
  fourthPlayer: PlayerType;
}
export interface PlayerMshariaType {
  bigCard: CardIds;
  cards: Card[] | string[];
  is100Same?: boolean;
  mshariaPower: number;
  bigMshroaPower: MshariaPowerType;
}
export interface PlayerBigMshariaType {
  bigCard: CardIds;
  is100Same?: boolean;
  bigMshroaPower: MshariaPowerType;
  distributingOrder: PlayOrderType;
  teamId: teamIds;
  mshariaPower: number;
}
export type teamIds = 1 | 0;
export type PlayOrderType = 0 | 1 | 2 | 3;
export type PlayersIDs =
  | 'firstPlayer'
  | 'secondPlayer'
  | 'thirdPlayer'
  | 'fourthPlayer';

export interface TeamsType {
  id: number;
  count: number;
  generalResult: number;
}

export interface MemoPlayersHooks {
  firstPlayer: PlayerType;
  secondPlayer: PlayerType;
  thirdPlayer: PlayerType;
  fourthPlayer: PlayerType;
}
export interface MemoAllHooks extends MemoPlayersHooks {
  isFirstPlayerHasFirstPlayedCardClass: boolean;
  isSecondPlayerHasFirstPlayedCardClass: boolean;
  isThirdPlayerHasFirstPlayedCardClass: boolean;
  isFourthPlayerHasFirstPlayedCardClass: boolean;
  isFirstPlayerHasHakmCard: boolean;
  isSecondPlayerHasHakmCard: boolean;
  isThirdPlayerHasHakmCard: boolean;
  isFourthPlayerHasHakmCard: boolean;
}
