import { CreateLeagueInput } from '../league';

type RoomBackgroundType = any;
type Achievement = any;

export type SetLeagueHandler = <K extends keyof CreateLeagueInput>(
  name: K,
  value: CreateLeagueInput[K]
) => void;

export type Select = {
  label: string;
  value: string;
};
export type SelectPlaySpeed =
  | {
      label: '10';
      value: 'normal';
    }
  | {
      label: '30';
      value: 'slow';
    }
  | {
      label: '5';
      value: 'fast';
    };

export type SelectPlayType =
  | {
      label: 'لعب حر';
      value: 'free';
    }
  | {
      label: 'لعب محدود';
      value: 'limited';
    };
export type ModalKeys =
  | 'isModalVisible'
  | 'isModal2Visible'
  | 'isTimeSetVisible'
  | 'isSessionVisible'
  | 'isFirstWinnerVisible'
  | 'isSecondWinnerVisible'
  | 'isMoneyVisible'
  | 'isFeaturesVisible'
  | 'messageModal'
  | 'titleModal'
  | 'cupModal'
  | 'sessionModal'
  | 'cardFormModal'
  | 'roomBackgroundModal'
  | 'voiceChatModal';
export type ModalData = {
  data: (
    | (Achievement & {
        diamondValue?: number;
      })
    | RoomBackgroundType
    | string
  )[];
  // ! need to change to image
} & LeagueFeature;
export type LeagueFeature = {
  _id: string;
  name: keyof CreateLeagueInput;
  description: string;
  img: string;
  title: string;
  diamondValue: number;
};
