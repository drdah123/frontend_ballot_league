export interface TeamBiggerMshariaType {
  teamId: 0 | 1 | null;
  mshariaPower: number;
}

export type MshariaPowerType = 40 | 20 | 10 | 4;

export interface PlayersAppearMshariaType {
  firstPlayer: { text: boolean; cards: boolean };
  secondPlayer: { text: boolean; cards: boolean };
  thirdPlayer: { text: boolean; cards: boolean };
  fourthPlayer: { text: boolean; cards: boolean };
}
export interface PlayerBooleanType {
  firstPlayer: boolean;
  secondPlayer: boolean;
  thirdPlayer: boolean;
  fourthPlayer: boolean;
}
