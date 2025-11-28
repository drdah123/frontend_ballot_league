import { RecurringCartSummaryItem } from '@stripe/stripe-react-native/lib/typescript/src/types/PlatformPay';

export type RoomBackgroundType = {
  _id: string;
  name: string;
  for: string;
  price: number;
  image: string;
  discount: number;
};

export type SubsType = {
  _id: string;
  price: number;
  for: string;
  discount: number;
  is: boolean;
};

export type DiamondType = {
  _id: string;
  count: number;
  price: number;
  discount: number;
};

type CardTypesNames = 'basic' | 'mid' | 'advanced';

export type CardsBackType = {
  _id: string;
  name: string;
  types: { _id: string; level: CardTypesNames; price: number; image: string }[];
};

export type OpenSheetParameter =
  | {
      stripe: {
        paymentIntent: string;
        ephemeralKey: string;
        customer: string;
        orderId: string;
      };
      type: 'sub';
      applePay: {
        billingAgreement: string;
        recurringSummaryItem: RecurringCartSummaryItem;
      };
      product: any;
    }
  | {
      stripe: {
        paymentIntent: string;
        ephemeralKey: string;
        customer: string;
        orderId: string;
      };
      type: 'diamond' | 'roomBackground' | 'cardsBack';
      product: any;
    };
