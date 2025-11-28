import { ImagesCardsBackName } from './cardTypes';
import { MessageWithSuccess } from './ApiTypes';

// SubsType definition
export type SubsType = {
  _id: string;
  price: number;
  for: string;
  discount: number;
  is: boolean;
};

export type SendGiftRes = {
  user_diamond?: number;
} & MessageWithSuccess;

export interface getGiftRes extends SendGiftRes {
  sub?: SubsType;
}

export type SendGiftVariables = {
  count: number;
  value: number;
  type: ChatGift['type'];
  message: string;
};

export type PicType = {
  url: string;
};

export type ChatGift = {
  _id: string;
  value: number;
  type: 'diamond' | 'sub';
  message: string;
  isFull: boolean;
  count: number;
  received: number;
  sender: Sender;
};

type Sender = {
  _id: string;
  name: string;
  pic: PicType;
  skins: {
    choseSkin: ImagesCardsBackName;
  };
  sub: {
    is: boolean;
  };
};

export type GenerousUser = {
  _id: string;
  name: string;
  pic: PicType;
  giftValue: {
    total: number;
    lastWeek: number;
  };
  skins: {
    choseSkin: ImagesCardsBackName;
  };
  sub: {
    is: boolean;
  };
};

type SenderChatPage = {
  _id: string;
  sub: GenerousUser['sub'];
  pic: PicType;
  name: string;
};

export interface ChatMessage {
  _id: string;
  text: string;
  sender: SenderChatPage;
}

type ChatPageInitial = {
  bestGenerous: GenerousUser[];
  last20: ChatMessage[];
  gift?: ChatGift;
};

export interface ChatPageSub extends ChatMessage {
  gift?: ChatGift;
  state: 'get_gift' | 'send_message' | 'send_gift';
}

export type ActionButtonsType = {
  messageId: string;
  userId: string;
} | null;
