import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LevelNames } from '../types/ApiTypes';
import { SubsType } from '../app/(tabs)/Store';
import { PicType } from '../app/(tabs)/Chat';
import { ImagesCardsBackName } from '../types/cardTypes';

export type GeneralStateType = {
  isAppLoading: boolean;
  isFirstTimeUseApp: boolean;
  userData: null | UserDataType;
};
export type UserDataType = {
  readonly _id: string;
  email: string;
  isNumberConfirm: boolean;
  achievementsNum: number;
  bio: string;
  name: string;
  role: string;
  token: string;
  pic: PicType;
  phone: string;
  username: string;
  level: {
    name: LevelNames;
    totalGamePoints: number;
  };
  diamond: number;
  skins: {
    cards: string[];
    backgrounds: string[];
    choseSkin: ImagesCardsBackName;
  };
  sub: SubsType;
  blocked: string[];
  friendRequests: string[];
  friends: string[];
  likesGiven: string[];
  likesReceived: string[];
  gamePoints: GamePointsType;
  gameRankings: GameRankingsType;
  league: LeagueType;
  // achievement: string[];
  // awards: string[];
};
export type GamePointsType = {
  currentWeek: number;
  currentMonth: number;
  lastWeek: number;
  lastMonth: number;
};
export type GameRankingsType = {
  weekRank: number;
  monthRank: number;
  totalRank: number;
};
type LeagueType = {
  currentMonthPoints: number;
  lastMonthPoints: number;
  currentMonthRank: number;
  lastMonthRank: number;
};
const initialState: GeneralStateType = {
  isAppLoading: true,
  isFirstTimeUseApp: true,
  userData: null,
};

const generalSlice = createSlice({
  initialState,
  name: 'generalState',
  reducers: {
    setUserData(state, action: PayloadAction<UserDataType | null>) {
      state.userData = action.payload;
    },
    setRoomBackgroundSkin(state, action: PayloadAction<string>) {
      if (state.userData)
        state.userData.skins.backgrounds = [
          ...state.userData.skins.backgrounds,
          action.payload,
        ];
    },
    setCardsBack(state, action: PayloadAction<string>) {
      if (state.userData)
        state.userData.skins.cards = [
          ...state.userData.skins.cards,
          action.payload,
        ];
    },
    setChoseCard(state, action: PayloadAction<ImagesCardsBackName>) {
      if (state.userData) state.userData.skins.choseSkin = action.payload;
    },
    setUserLevel(state, action: PayloadAction<UserDataType['level']>) {
      if (state.userData?.level) state.userData.level = action.payload;
    },
    setIsAppLoading(state, action: PayloadAction<boolean>) {
      state.isAppLoading = action.payload;
    },
    setIsFirstTimeUseApp(state) {
      state.isFirstTimeUseApp = true;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(
  //       setUserDataAsync.fulfilled,
  //       (state, { payload }: PayloadAction<UserDataType>) => {
  //         state.userData = payload;
  //       }
  //     )
  //     .addCase(setUserDataAsync.rejected, (state, action) => {});
  // },
});

// const setUserDataAsync = createAsyncThunk(
//   'userData/loginAsync',
//   async ({
//     login,
//     user,
//     show,
//   }: {
//     login: Promise<
//       FetchResult<{
//         login: UserDataType;
//       }>
//     >;
//     user: {
//       password: string;
//       email: string;
//     };
//     show: (
//       message: string | JSX.Element,
//       toastOptions?: ToastOptions | undefined
//     ) => string;
//   }) => {
//     // @ts-ignore
//     const { data }: { data: { login: UserDataType } } = await login({
//       variables: user,
//     });
//     show('تم تسجيل الدخول', {
//       type: 'success',
//     });
//     return data.login;
//   }
// );

export const {
  setUserData,
  setIsAppLoading,
  setIsFirstTimeUseApp,
  setUserLevel,
  setRoomBackgroundSkin,
  setCardsBack,
  setChoseCard,
} = generalSlice.actions;
export default generalSlice.reducer;
