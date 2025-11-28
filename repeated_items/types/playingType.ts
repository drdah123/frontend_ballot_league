import { Card, Classes } from './cardTypes';
import { PlayersIDs, teamIds } from './playerType';

export interface PlayingType {
  playingType: 'Hakm' | 'Sun' | 'Ashkl' | null;
  hakmType?: Classes;
}
export type IsBallotType = { is: false } | { is: true; player: PlayersIDs };

export interface LimitedPlayStateType {
  teamBiggerMshroa?: teamIds;
  class: Classes | null;
  buyer: PlayersIDs | null;
  groundCard: Card | null;
  buyingTime: boolean;
  isGid: {
    isGidTime: boolean;
    player: PlayersIDs | null;
    isCanBeKboot: boolean;
  };
  overBuyingTime: {
    is: boolean;
    players: {
      firstPlayer: boolean;
      secondPlayer: boolean;
      thirdPlayer: boolean;
      fourthPlayer: boolean;
    };
  };
  turn: 0 | 1;
  playingType: PlayingType | null;
  double: null | {
    is: boolean;
    power: 'double' | 'three' | 'four' | 'ghwa';
    isOpen: boolean;
    player: PlayersIDs;
    secondPlayer: PlayersIDs;
    lastDoubler: PlayersIDs;
  };
  swa: null | { player: PlayersIDs; isTime: boolean; teamId: teamIds };
  isTakik: boolean;
  isBallot: IsBallotType;
}
export type MessagesType = {
  firstPlayer: string;
  secondPlayer: string;
  thirdPlayer: string;
  fourthPlayer: string;
};
export type PlayersPlacesType = {
  firstPlayer: 'top' | 'right' | 'left' | 'bottom';
  secondPlayer: 'top' | 'right' | 'left' | 'bottom';
  thirdPlayer: 'top' | 'right' | 'left' | 'bottom';
  fourthPlayer: 'top' | 'right' | 'left' | 'bottom';
};

export type overBuyingTimePlayersType = {
  firstPlayer: boolean;
  secondPlayer: boolean;
  thirdPlayer: boolean;
  fourthPlayer: boolean;
};
export interface BuyingParameterType {
  playingType: PlayingType | 'Skip';
  buyer: PlayersIDs;
}
