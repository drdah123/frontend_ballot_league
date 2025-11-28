import {
  LevelNames,
  MessageWithSuccess,
  PlayerType,
  RoomType,
} from './ApiTypes';

import { OtherUserType } from './ApiTypes';
import { ImagesCardsBackName } from './cardTypes';
import { TeamsType } from './playerType';
import { GeneralPlayingType } from './RoomTypes';

export type CreateLeagueInput = {
  name: string;
  description?: string;
  type: 'public' | 'qeed' | 'private';
  password?: string; // Only required if type === 'private'
  maxSeats: 16 | 32 | 64;
  playSpeed: PlaySpeed;
  playType: GeneralPlayingType;
  levelName: LevelNames;
  roundType: RoundType;
  prizes: LeagueType['prizes'];
  roomBackground?: RoomBackgrounds;
  cardForm?: string;
  startTime: string;
  bio?: string;
  title?: string;
  cup?: string; // ID of the cup if applicable
  // for private
  voiceChat?: boolean;
  chooseTeam?: boolean;
  spectatorsChat?: boolean;
};
export type RoomBackgrounds = 'default' | 'diwania' | 'mshb' | 'wadi' | 'br';

export type LeagueType = {
  _id: string;
  description: string;
  type: LeagueTypes;
  creator: {
    _id: string;
    name: string;
    email: string;
    bio: string;
    pic: {
      url: string;
    };
    skins: {
      choseSkin: ImagesCardsBackName;
    };
  };
  name: string;
  maxSeats: 64 | 32 | 16;
  roundType: RoundType;
  status: LeagueStatus;
  prizes: {
    winnerPrize: number;
    secondWinnerPrize?: number;
  };
  spectators?: OtherUserType[];
  playSpeed: PlaySpeed;
  playType: PlayType;
  levelName: LevelNames;
  createdAt: string;
  updatedAt: string;
  isRegistered: boolean;
  currentRound: 16 | 8 | 4 | 2;
  participantsNumber: 64 | 32 | 16 | 8;
  startTime: string;
  matches?: ApiMatch[];
} & AdLeague;
type AdLeague =
  | {
      isAd: true; // Optional field for advertisement
      img: string; // required for ad league URL
    }
  | {
      isAd: false;
    };
type LeagueStatus = 'active' | 'ended' | 'coming';
export type PlaySpeed = 'slow' | 'normal' | 'fast';
type PlayType = 'free' | 'limited';
export type RoundType = 'all_1' | 'just_final' | 'all_3'; // Type of rounding just_final = all a round except the final
export type LeagueTypes = 'public' | 'private' | 'qeed'; // Type o
export interface IMatch {
  league: string | LeagueType; // Reference to the associated League
  round: number; // Match round (default: 1, final: 3)
  stage: '32 Teams' | '16 Teams' | '8 Teams' | '4 Teams' | 'Final'; // Match stage (e.g., '32 Teams', '16 Teams', '8 Teams', '4 Teams', 'Final')
  team1: string | ITeam; // Team 1: Reference to Team model
  team2: string | ITeam; // Team 2: Reference to Team model
  winnerTeam?: string; // Winning team (optional until match ends)
  loserTeam?: string; // Losing team (optional until match ends)
  isFinal: boolean; // Indicates if the match is a final
  roundWinners: string[]; // Array of round winners
  roomId?: string | RoomType; // Reference to the room (optional)
  // Additional properties for display
  scoreLeft?: number; // Score for team 1
  scoreRight?: number; // Score for team 2
  viewers?: number; // Number of viewers
  leftTeam?: {
    name: string;
  };
  rightTeam?: {
    name: string;
  };
  scenario?: 1 | 2 | 3; // Scenario for match display (1: ended, 2: watch, 3: upcoming)
}

// export type LeagueMatch = Omit<
//   ApiMatch,
//   'team1' | 'team2' | 'stage' | '_id'
// > & {
//   _id?: string;

//   team1: ApiMatch['team1'] | string;
//   team2: ApiMatch['team2'] | string;
//   stage: ApiMatch['stage'] | 'none'; // Allow 'none' for upcoming matches
//   scoreLeft: number;
//   scoreRight: number;
//   viewers: number;
//   leftTeam: { name: string };
//   rightTeam: { name: string };
// };
export interface ApiMatch {
  readonly _id: string; // Unique identifier for the match
  league: string | LeagueType; // Reference to the associated League
  round: number; // Match round (default: 1, final: 3)
  stage: '32 Teams' | '16 Teams' | '8 Teams' | '4 Teams' | 'Final'; // Match stage (e.g., '32 Teams', '16 Teams', '8 Teams', '4 Teams', 'Final')
  winnerTeam?: string; // Winning team (optional until match ends)
  loserTeam?: string; // Losing team (optional until match ends)
  isFinal: boolean; // Indicates if the match is a final
  roundWinners: string[]; // Array of round winners
  roomId?: string | RoomMatch; // Reference to the room (optional)
  spectatorsCount?: number; // Number of spectators
  team1: {
    _id: string;
    players: string[];
  };
  team2: {
    _id: string;
    players: string[];
  };
}
type RoomMatch = {
  _id: string;
  players: PlayersRoomMatch; // Array of player IDs in the room
  team1: TeamsType;
  team2: TeamsType;
};

type PlayerMatch = {
  id: number;
  realPlayer: PlayerType['realPlayer'] & { pic: { url?: string } };
  teamId: number; // ID of the team the player belongs to
};
type PlayersRoomMatch = {
  firstPlayer: PlayerMatch;
  secondPlayer: PlayerMatch;
  thirdPlayer: PlayerMatch;
  fourthPlayer: PlayerMatch;
};
export interface ITeam {
  _id: string; // Optional ID for the team
  league: string; // Reference to the associated League
  players: [string, string]; // Two players per team
  matchesPlayed: number; // Total matches the team has played
  matchesWon: number; // Total matches the team has won
}

export type LeaveLeagueResponse = {
  leaveLeague: MessageWithSuccess;
};

export type Cup = {
  _id: string;
  name: string;
  description: string;
  img: string;
  diamondValue: number;
};
