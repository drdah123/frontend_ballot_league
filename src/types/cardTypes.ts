import { PlayersIDs, teamIds } from './playerType';

export interface Card {
  id: CardIds;
  isPlayed: IsPlayedType;
  name: string;
  image: any;
  class: Classes;
  sun: {
    power: powerSunType;
    count: countSunType;
  };
  hakm: {
    power: powerHakmType;
    count: countHakmType;
  };
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

interface SbeetClass {
  title: 'Sbeet';
  id: 3;
}
interface DimanClass {
  title: 'Diman';
  id: 2;
}

interface CheriaClass {
  title: 'Cheria';
  id: 1;
}

interface HacClass {
  title: 'Hac';
  id: 0;
}

export interface PlayedCard extends Card {
  playerId: number;
  teamId: number;
}

export interface ClassTypes {
  [key: string]: Classes;
}
export type Classes = SbeetClass | DimanClass | CheriaClass | HacClass;
type powerSunType = 7 | 8 | 9 | 14 | 11 | 12 | 13 | 15;
type powerHakmType = 7 | 8 | 16 | 17 | 12 | 13 | 14 | 15;
type countHakmType = 21 | 14 | 11 | 10 | 4 | 3 | 2 | 0;
type countSunType = 11 | 10 | 4 | 3 | 2 | 0;

export type ImagesCardsBackName =
  | 'default'
  | 'sudo1'
  | 'sudo2'
  | 'palm'
  | 'saudi_pro'
  | 'saudi_gray'
  | 'saudi_white'
  | 'arabia';
