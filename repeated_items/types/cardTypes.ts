import { PlayersIDs, teamIds } from './playerType';

export interface Card {
  id: CardIds;
  isPlayed: IsPlayedType;
  name: string;
  image: any;
}

export interface CardWithPlayer extends Card {
  player: PlayersIDs;
  teamId: teamIds;
}
export type IsPlayedType =
  | { is: false }
  | { is: true; playingTurnNum: number; isGroundCard?: boolean };
export interface CardsDataObj {
  [key: string]: Card;
}
export type CardIds = 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface PlayedCard extends Card {
  playerId: number;
  teamId: number;
}

export type ImagesCardsBackName =
  | 'default'
  | 'sudo1'
  | 'sudo2'
  | 'palm'
  | 'saudi_pro'
  | 'saudi_gray'
  | 'saudi_white'
  | 'arabia';
