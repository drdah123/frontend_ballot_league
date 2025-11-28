import { GidCardAPI } from './ApiTypes';
import { Card, Classes } from './cardTypes';
import { PlayOrderType, PlayerType, PlayersIDs, teamIds } from './playerType';
export type GidReturn =
  | { isGidRight: true; teamId: teamIds }
  | { isGidRight: false };

export type GidCard =
  | {
      isThereGid: false;
      card: Card;
      playingTurnNum: number;
      playerTurn: PlayOrderType;
      player: PlayersIDs;
      teamId: teamIds;
    }
  | {
      isThereGid: true;
      card: Card;
      playingTurnNum: number;
      playerTurn: PlayOrderType;
      gidInfo: GidInfoType;
      player: PlayersIDs;
      teamId: teamIds;
    };

// ? gidType:
// ?| 'Hakm_double_play_trbia'
// ?| 'Hakm_eat'
// ?| 'Hakm_tloa'
// !________
// ?| 'Swa_wrong'
// ?| 'Mshroa_wrong'
// ?| 'Mshroa_smaller';
export type GidClassesType =
  | 'Cutting'
  | 'Hakm_eat'
  | 'Hakm_double_play_trbia'
  | 'Hakm_tloa'
  | 'Swa_wrong'
  | 'Takik_wrong';
export type GidInfoType =
  | {
      gidType: 'Cutting' | 'Hakm_eat';
      class: Classes;
    }
  | {
      gidType: 'Hakm_tloa' | 'Hakm_double_play_trbia' | 'Takik_wrong';
      playerTurn: number;
    };

export type IsThereGidType =
  | {
      isThereGid: true;
      gidInfo: { gidType: 'Cutting' | 'Hakm_eat'; class: string };
    }
  | {
      isThereGid: true;
      gidInfo: {
        gidType: 'Hakm_tloa' | 'Hakm_double_play_trbia' | 'Takik_wrong';
        playerTurn: number;
      };
    }
  | {
      isThereGid: false;
    };
export type GidInfoTypeForAPI =
  | {
      gidType: 'Cutting' | 'Hakm_eat';
      class: string;
    }
  | {
      gidType: 'Hakm_tloa' | 'Hakm_double_play_trbia' | 'Takik_wrong';
      playerTurn: number;
    }
  | null;
export interface GidType {
  isThereGid: boolean;
  class: Classes;
  eater: PlayerType | null;
  playedCards: GidCard[];
  isTakik: boolean;
}
export interface GidTypeAPI {
  isThereGid: boolean;
  class: Classes;
  eater: PlayerType;
  playedCards: GidCardAPI[];
  isTakik: boolean;
}
export type KbootGid = {
  isThereGid: boolean;
  isNull: boolean;
  class: Classes | null;
  eater: PlayerType | null;
  playedCards: GidCard[] | null[];
};

export type SelectedCardType = {
  playingTurnNum: number;
  playerTurn: PlayOrderType;
} | null;
export interface CardNotPlayedType {
  key: PlayersIDs;
  teamId: teamIds;
}
