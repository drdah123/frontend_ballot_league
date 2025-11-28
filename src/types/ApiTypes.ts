import { UserDataType } from '../reducers/GeneralReducer';
import { GidInfoType, GidInfoTypeForAPI, GidTypeAPI } from './GidTypes';
import { MshariaPowerType, PlayerBooleanType } from './MshariaType';
import {
  AlnshraType,
  GeneralPlayingType,
  GeneralRoomType,
  RoomSpeedType,
} from './RoomTypes';
import { CardIds, ImagesCardsBackName, IsPlayedType } from './cardTypes';
import { PlayOrderType, PlayersIDs, teamIds } from './playerType';
import { LimitedPlayStateType } from './playingType';

export interface PlayerType {
  _id: string;
  realPlayer: {
    pic: string;
    name: string;
    skins: UserDataType['skins'];
    level: UserDataType['level'];
  };
  isBoot: boolean;
  distributingOrder: PlayOrderType;
  teamId: teamIds;
  playOrder: PlayOrderType;
  cards: [
    {
      cardName: string;
      isPlayed: {
        is: boolean;
        playingTurnNum: number;
      };
    }
  ];
}
type CardNotPlayedAPI = {
  cardName: string;
  player: PlayersIDs;
  teamId: teamIds;
};
export type LevelNames = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type LimitedPlayStatesType = {
  teamBiggerMshroa: teamIds;
  class: string;
  buyer: PlayersIDs;
  groundCard: string;
  buyingTime: boolean;
  isGid: LimitedPlayStateType['isGid'];
  overBuyingTime: {
    is: boolean;
    players: PlayerBooleanType;
  };
  turn: 0 | 1;
  playingType: 'Hakm' | 'Sun' | null;
  hakmType: string;
  double: null | {
    is: boolean;
    power: 'double' | 'three' | 'four' | 'ghwa';
    isOpen: boolean;
    player: PlayersIDs;
    secondPlayer: PlayersIDs;
    lastDoubler: PlayersIDs;
  };
  swa: null | { player: PlayersIDs; isTime: boolean; teamId: teamIds };
  debounceTime: string;
  isTakik: boolean;
};
export type EndResultPlayer = {
  playerLevel: {
    name: LevelNames;
    levelNum: number;
    changedNum: number;
    nextLevel: number;
  };
  evaluating: {
    buying: string;
    general: string;
  };
};
type TeamTypeWithoutID = {
  count: number;
  generalResult: number;
};
export interface PlayedType {
  state: States;
  message: string;
  isGidTrue?: boolean;
  alnshra?: AlnshraType;
  card: {
    isThereGid: boolean;
    cardName: string;
    gidInfo: GidInfoTypeForAPI;
  };
  endResult?: {
    firstPlayer: EndResultPlayer | null;
    secondPlayer: EndResultPlayer | null;
    thirdPlayer: EndResultPlayer | null;
    fourthPlayer: EndResultPlayer | null;
    playingType: 'free' | 'limited';
    team1: TeamTypeWithoutID;
    team2: TeamTypeWithoutID;
    winnerTeam: teamIds;
  };
  canBeKbootScreen?: {
    y: number;
    screenNumber: 0 | 1;
    giderScreenHeight: number;
    card?: {
      cardName: string;
      playingTurnNum: number;
      playerTurn: PlayOrderType;
      player: PlayersIDs;
    };
    isDelete: boolean;
  };
  player?: PlayersIDs;
  giderScreen: {
    y?: number;
    firstCard?: GidCardAPI;
    secondCard?: GidCardAPI;
    cardNotPlayed?: CardNotPlayedAPI;
    giderScreenHeight?: number;
  };
  mshroa?: {
    cards: string[];
    bigCard: CardIds;
    is100Same: boolean;
    bigMshroaPower: MshariaPowerType;
    distributingOrder: number;
    teamId: number;
    player: string;
    mshariaPower: number;
  };
  result?: {
    team1: {
      generalResult: number;
      count: number;
    };
    team2: {
      generalResult: number;
      count: number;
    };
  };
  cards: string[];
  playingTurnNum: number;
  playerTurn: PlayOrderType;
  gidInfo: GidInfoTypeForAPI;
  readonly roomId: string;
  eater?: string;
  playersOrder?: {
    firstPlayer: PlayOrderType;
    secondPlayer: PlayOrderType;
    thirdPlayer: PlayOrderType;
    fourthPlayer: PlayOrderType;
  };
  limitedPlayStates: LimitedPlayStatesType;
  distributingPlayersOrder?: {
    firstPlayer: PlayOrderType;
    secondPlayer: PlayOrderType;
    thirdPlayer: PlayOrderType;
    fourthPlayer: PlayOrderType;
    __typename?: string;
  };
  playerChoice?: 'Hakm' | 'Sun' | 'Skip' | 'Worq' | 'Ashkl';
  isTakik?: boolean;
  isBallot?: boolean;
  players?: {
    firstPlayer: PlayerType;
    secondPlayer: PlayerType;
    thirdPlayer: PlayerType;
    fourthPlayer: PlayerType;
  };
  boots: PlayerBooleanType;
  sticker?: {
    stickerId: string;
    to: PlayersIDs[];
    from: PlayersIDs;
  };
  spectators?: Spectator[];
}
export type Spectator = {
  _id: string;
  name: string;
  pic: {
    url: string;
  };
  level: {
    name: LevelNames;
  };
  skins: {
    choseSkin: string;
  };
};
export interface PlayedSendType {
  cardName: string;
  mshroa?: {
    cards: string[];
    bigCard: CardIds;
    is100Same: boolean;
    bigMshroaPower: number;
    distributingOrder: number;
    teamId: number;
    player: string;
    mshariaPower: number;
  };
  player?: PlayersIDs;
  roomId: string;
  teamBiggerMshroa?: string;
  isTakik?: boolean;
  isBallot?: boolean;
}
type PlayerTypeForAPI = {
  realPlayer: {
    name: string;
    level: UserDataType['level'];
  };
};
export interface RoomType {
  _id: string;
  name: string;
  team1: TeamEnterRoomType;
  team2: TeamEnterRoomType;
  players: {
    firstPlayer: PlayerTypeForAPI;
    secondPlayer: PlayerTypeForAPI;
    thirdPlayer: PlayerTypeForAPI;
    fourthPlayer: PlayerTypeForAPI;
  };
  playingType: GeneralPlayingType;
  roomType: GeneralRoomType;
  playingSpeed: RoomSpeedType;
  lowestPlayerLevel: LevelNames;
}
export type PLayerRoomSubType = {
  level: LevelNames;
  name: string;
  pic?: string;
};
export type RoomsType = {
  _id: string;
  team1: TeamEnterRoomType;
  team2: TeamEnterRoomType;
  name: string;
  playingType: GeneralPlayingType;
  roomType: GeneralRoomType;
  playingSpeed: RoomSpeedType;
  lowestPlayerLevel: LevelNames;
};

export interface OtherUserType extends RealPlayerType {
  _id: string;
  email?: string;
}
export interface RealPlayerType {
  name: string;
  pic: {
    url: string;
  };
  sub: { is: boolean };
  level: { name: LevelNames; totalGamePoints: number };
  skins: { choseSkin: ImagesCardsBackName };
}
export type ResWith_id = {
  _id: string;
} & MessageWithSuccess;
type PlayerEnterRoomType = {
  _id: string;
  realPlayer?: RealPlayerType;
  isBoot: boolean;
  distributingOrder: PlayOrderType;
  teamId: number;
  playOrder: PlayOrderType;
  cards: [
    {
      cardName: string;
      isPlayed: IsPlayedType;
    }
  ];
};
export type TeamEnterRoomType = {
  id: number;
  count: number;
  generalResult: number;
  firstPlayer: PlayerEnterRoomType['realPlayer'];
  secondPlayer: PlayerEnterRoomType['realPlayer'];
};
export type GidCardAPI =
  | {
      isThereGid: false;
      cardName: string;
      playingTurnNum: number;
      playerTurn: PlayOrderType;
      player: PlayersIDs;
      teamId: teamIds;
    }
  | {
      isThereGid: true;
      cardName: string;
      playingTurnNum: number;
      playerTurn: PlayOrderType;
      gidInfo: GidInfoType;
      player: PlayersIDs;
      teamId: teamIds;
    };
export type GidCardSendAPI = {
  cardName: string;
  playingTurnNum: number;
  playerTurn: PlayOrderType;
  player: PlayersIDs;
  teamId: teamIds;
};
export type States =
  | 'play'
  | 'playing_type'
  | 'end_result'
  | 'can_be_kboot_screen'
  | 'can_be_kboot'
  | 'gider_screen'
  | 'gid'
  | 'result'
  | 'message'
  | 'boots'
  | 'swa'
  | 'double'
  | 'rest'
  | 'worq'
  | 'waiting'
  | 'search'
  | 'player_enter'
  | 'player_exit'
  | 'spectator_enter'
  | 'spectator_exit';
// |'eating_result'

export type SearchRoomMutationType =
  | {
      _id: string;
      state: States;
      playerId: PlayersIDs;
    }
  | EnterRoomType;
export interface EnterRoomType {
  _id: string;
  name: string;
  state: States;
  playingType: GeneralPlayingType;
  team1: TeamEnterRoomType;
  team2: TeamEnterRoomType;
  playerId: PlayersIDs;
  players: {
    firstPlayer: PlayerEnterRoomType;
    secondPlayer: PlayerEnterRoomType;
    thirdPlayer: PlayerEnterRoomType;
    fourthPlayer: PlayerEnterRoomType;
  };
  limitedPlayStates: LimitedPlayStateType;
  playerTurn: PlayOrderType;
  playingTurnNum: number;
  playedCards: GidCardAPI[];
  gid: GidTypeAPI[];
  boots: PlayerBooleanType;
  roomBackground: string;
  spectators: Spectator[];
  spectate: boolean;
}
export type StickerType = {
  _id: string;
  diamond_price: number;
  img: string;
};
export type MessageWithSuccess = {
  success: boolean;
  message: string;
};

export type PlayingTypeInput = {
  playingType: string | null;
  hakmType?: string;
  buyer: string;
  roomId: string;
};
