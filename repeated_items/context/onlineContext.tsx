import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Chats_sub, MessageReceived } from '../schema/friend';
import { useSubscription } from '@apollo/client';
import { ONLINE } from '../schema/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { UserDataType } from '../reducers/GeneralReducer';
import {
  EnterRoomType,
  OtherUserType,
  PlayedType,
  RoomsType,
} from '../types/ApiTypes';
import { ApiMatch, LeagueType } from '../types/league';
import { useRouter } from 'expo-router';
import { ChatGift, ChatMessage, ChatPageSub } from '../app/(tabs)/Chat';
import { AppState } from 'react-native';
import { RoomSubType } from '../types/RoomTypes';
import { PlayersIDs } from '../types/playerType';
import { useAppContext } from './context';
import getGraphQLErrors from '../utils/getGraphqlErrors';
import playedOnlineHandler from '../utils/playedOnline';

type NewMessages = {
  [chatId: string]: MessageReceived[];
} | null;
type Online = {
  online: {
    chat: Chats_sub;
    league: SubOnlineLeague;
    chat_page_sub?: ChatPageSub;
    roomsSub?: RoomSubType;
    searchRoomSub?: EnterRoomType;
    played?: PlayedType;
  };
};

type SubOnlineLeague = {
  chat?: ChatPageSub;
  joinedUser?: OtherUserType;
  enterMatch?: EnterRoomType;
  leftUser?: string;
  matches: ApiMatch[];
};

const Context = createContext<{
  setNewMessages: React.Dispatch<React.SetStateAction<NewMessages>>;
  newMessages: NewMessages;
  setUserTyping: React.Dispatch<React.SetStateAction<string[]>>;
  userTyping: string[];
  league: LeagueType | null;
  setLeague: React.Dispatch<React.SetStateAction<LeagueType | null>>;
  leagueChat: ChatPageSub[] | null;
  setLeagueChat: React.Dispatch<React.SetStateAction<ChatPageSub[] | null>>;
  pageChat_gift: ChatGift | undefined;
  setPageChat_gift: React.Dispatch<React.SetStateAction<ChatGift | undefined>>;
  pageChat_isGiftTaken: boolean;
  setPageChat_isGiftTaken: React.Dispatch<React.SetStateAction<boolean>>;
  pageChat: ChatMessage[] | undefined;
  setPageChat: React.Dispatch<React.SetStateAction<ChatMessage[] | undefined>>;
  pageChat_IsGift: boolean;
  setPageChat_IsGift: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: RoomsType[];
  setRooms: React.Dispatch<React.SetStateAction<RoomsType[]>>;
  searchRoomSub: {
    loading: boolean;
    playerId: PlayersIDs | '';
  };
  setSearchRoomSub: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      playerId: PlayersIDs | '';
    }>
  >;
}>(
  // @ts-ignore
  null
);

export default function OnlineContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = useSelector<RootState, UserDataType>(
    // @ts-ignore
    (state) => state.generalState.userData
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [newMessages, setNewMessages] = useState<NewMessages>(null);
  const [userTyping, setUserTyping] = useState<string[]>([]);
  const [league, setLeague] = useState<LeagueType | null>(null);
  const [leagueChat, setLeagueChat] = useState<ChatPageSub[] | null>(null);
  // !need to edit reconnect logic
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(true);

  // chat page
  const [pageChat_gift, setPageChat_gift] = useState<ChatGift | undefined>();
  const [pageChat_isGiftTaken, setPageChat_isGiftTaken] = useState(true);
  const [pageChat, setPageChat] = useState<ChatMessage[] | undefined>();
  const [pageChat_IsGift, setPageChat_IsGift] = useState(false);

  // rooms subscription
  const [rooms, setRooms] = useState<RoomsType[]>([]);

  // search room subscription
  const [searchRoomSub, setSearchRoomSub] = useState<{
    loading: boolean;
    playerId: PlayersIDs | '';
  }>({
    loading: false,
    playerId: '',
  });

  // played subscription
  const {
    firstGid,
    kbootPlayerTurn,
    kbootPlayingTurnNum,
    setKbootPlayerTurn,
    setKbootPlayingTurnNum,
    setPlayersObj,
    rightPlaying,
    setRightPlaying,
    isFirstPlayerHasFirstPlayedCardClass,
    isFirstPlayerHasHakmCard,
    isFourthPlayerHasFirstPlayedCardClass,
    isFourthPlayerHasHakmCard,
    isSecondPlayerHasFirstPlayedCardClass,
    isSecondPlayerHasHakmCard,
    isThirdPlayerHasFirstPlayedCardClass,
    isThirdPlayerHasHakmCard,
    limitedPlayStatesCanBeKboot,
    playersObj,
    setLimitedPlayStatesCanBeKboot,
    setPlayers,
    setTeams,
    setAlnshra,
    setSpectators,
    setBoots,
    setSentStickers,
    setRenderPlayerCards,
    setIsGidTrue,
    setGid,
    setPlayerTurn,
    setMshariaLimit,
    setLimitedPlayStates,
    setPlayingTurnNum,
    setFirstCard,
    setSecondCard,
    playCard,
    players,
    limitedPlayStates,
    setWaitingTime,
    setMessageHandler,
    setCardNotPlayed,
    scrollHandler,
    playerId,
    setPlayerId,
    spectators,
    teams,
  } = useAppContext();

  // ! need to implement all subscriptions in this useSubscription
  // ! need to test chat_page_sub, league, roomsSub, searchRoomSub
  useSubscription<Online>(ONLINE, {
    onComplete() {
      console.log('ONLINE', 'complete');
    },
    onData({ data }) {
      const league = data.data?.online.league;
      const chat = data.data?.online.chat;
      const chat_page_sub = data.data?.online.chat_page_sub;
      const roomsSub = data.data?.online.roomsSub;
      const played = data.data?.online?.played;

      if (league && league.enterMatch)
        // ! need to add alert
        return router.push({
          pathname: 'Room',
          params: {
            roomId: league.enterMatch._id,
            room: JSON.stringify(league.enterMatch),
          },
        });
      if (league) {
        console.log(`🚀 ~ onData ~ league:`, league);
        if (league.chat)
          setLeagueChat((prev) => {
            if (!league.chat) return null;
            if (!prev) return [league.chat];
            return [...prev, league.chat];
          });
        if (league.joinedUser)
          setLeague((prev) => {
            if (!prev) return null;
            if (!league.joinedUser) return prev;
            prev.spectators = [...(prev.spectators || []), league.joinedUser];
            return { ...prev };
          });
        if (league.leftUser)
          setLeague((prev) => {
            console.log(`🚀 ~ onData ~ league.leftUser:`, league.leftUser);
            if (!prev) return null;
            if (!prev.spectators) return prev;
            prev.spectators = prev.spectators.filter(
              (user) => user._id !== league.leftUser
            );
            return { ...prev };
          });
        if (league.matches)
          // ! need to edit
          setLeague((prev) => {
            if (!prev) return null;
            if (league.matches.length === 0) return prev;
            if (!prev.matches) prev.matches = [];
            if (league.matches.length === 1)
              prev.matches = prev.matches.map((match) => {
                if (match._id === league.matches[0]._id) {
                  return {
                    ...match,
                    ...league.matches[0],
                  };
                }
                return match;
              });
            else prev.matches = [...league.matches, ...prev.matches];
            return { ...prev };
          });
      }

      if (chat) {
        if (
          !userData ||
          chat.userIdStopTyping === userData._id ||
          chat.userIdTyping === userData._id ||
          chat.messageReceived?.sender._id === userData._id
        )
          return;
        if (chat.userIdStopTyping)
          setUserTyping((prev) =>
            prev.filter((id) => id !== chat.userIdStopTyping)
          );
        if (chat.userIdTyping)
          setUserTyping((prev) => [...prev, chat.userIdTyping]);
        if (chat.messageReceived) {
          setUserTyping((prev) =>
            prev.filter((id) => id !== chat.messageReceived.sender._id)
          );
          setNewMessages((prv) => {
            if (!prv) return { [chat.chatId]: [chat.messageReceived] };
            const newMessage = {
              ...chat.messageReceived,
              sender: chat.messageReceived.sender,
            };
            prv[chat.chatId] = prv[chat.chatId]
              ? prv[chat.chatId]
                  .filter((m) => m._id !== newMessage._id)
                  .concat(newMessage)
              : [newMessage];
            return { ...prv };
          });
        }
      }
      if (chat_page_sub) {
        console.log(`🚀 ~ onData ~ chat_page_sub:`, chat_page_sub);

        if (chat_page_sub.gift) {
          if (chat_page_sub.state === 'get_gift')
            setPageChat_gift((prv) => {
              if (!prv || !chat_page_sub.gift) return prv;
              prv.received = chat_page_sub.gift.received;
              prv.isFull = chat_page_sub.gift.isFull;
              return prv;
            });
          else if (chat_page_sub.state === 'send_gift') {
            setPageChat_gift(chat_page_sub.gift);
            setPageChat_isGiftTaken(false);
            setPageChat_IsGift(true);
          }
        } else if (chat_page_sub.state === 'send_message') {
          setPageChat((prev) =>
            [...(prev || []), chat_page_sub].filter(
              (msg) =>
                !(
                  userData &&
                  userData.blocked &&
                  userData.blocked.includes(msg.sender._id)
                )
            )
          );
        }
      }
      if (roomsSub) {
        setRooms((prv) =>
          prv.map((room) => {
            if (roomsSub.players && room._id === roomsSub._id) {
              if (roomsSub.players.firstPlayer) {
                room.team1.firstPlayer = {
                  // @ts-ignore
                  level: roomsSub.players.firstPlayer.level,
                  name: roomsSub.players.firstPlayer.name,
                };
              }
              if (roomsSub.players.secondPlayer) {
                room.team1.secondPlayer = {
                  // @ts-ignore
                  level: roomsSub.players.secondPlayer.level,
                  name: roomsSub.players.secondPlayer.name,
                };
              }
              if (roomsSub.players.thirdPlayer) {
                room.team2.firstPlayer = {
                  // @ts-ignore
                  level: roomsSub.players.thirdPlayer.level,
                  name: roomsSub.players.thirdPlayer.name,
                };
              }
              if (roomsSub.players.fourthPlayer) {
                room.team2.secondPlayer = {
                  // @ts-ignore
                  level: roomsSub.players.fourthPlayer.level,
                  name: roomsSub.players.fourthPlayer.name,
                };
              }
            }
            if (roomsSub.team1)
              room.team1.generalResult = roomsSub.team1.generalResult;
            if (roomsSub.team2)
              room.team2.generalResult = roomsSub.team2.generalResult;
            return room;
          })
        );
      }
      const searchRoomRes = data.data?.online.searchRoomSub;
      if (searchRoomRes) {
        console.log(
          `🚀 ~ file: useSearch.ts:16 ~ onData ~ searchRoomSub:`,
          searchRoomRes
        );
        if (
          searchRoomRes.state === 'waiting' &&
          'players' in searchRoomRes &&
          searchRoomSub.playerId
        ) {
          searchRoomRes.playerId = searchRoomSub.playerId;
          router.push({
            pathname: 'Room',
            params: {
              roomId: searchRoomRes._id,
              room: JSON.stringify(searchRoomRes),
            },
          });
          setSearchRoomSub((prv) => ({
            ...prv,
            loading: false,
          }));
        }
      }
      if (played /* && //! make sure it's in room */)
        playedOnlineHandler({
          firstGid,
          kbootPlayerTurn,
          kbootPlayingTurnNum,
          setKbootPlayerTurn,
          setKbootPlayingTurnNum,
          setPlayersObj,
          rightPlaying,
          setRightPlaying,
          isFirstPlayerHasFirstPlayedCardClass,
          isFirstPlayerHasHakmCard,
          isFourthPlayerHasFirstPlayedCardClass,
          isFourthPlayerHasHakmCard,
          isSecondPlayerHasFirstPlayedCardClass,
          isSecondPlayerHasHakmCard,
          isThirdPlayerHasFirstPlayedCardClass,
          isThirdPlayerHasHakmCard,
          limitedPlayStatesCanBeKboot,
          playersObj,
          setLimitedPlayStatesCanBeKboot,
          setPlayers,
          setTeams,
          setAlnshra,
          setSpectators,
          setBoots,
          setSentStickers,
          setRenderPlayerCards,
          setIsGidTrue,
          setGid,
          setPlayerTurn,
          setMshariaLimit,
          setLimitedPlayStates,
          setPlayingTurnNum,
          setFirstCard,
          setSecondCard,
          playCard,
          players,
          limitedPlayStates,
          setWaitingTime,
          setMessageHandler,
          setCardNotPlayed,
          scrollHandler,
          playerId,
          dispatch,
          router,
          played,
          spectators,
          teams,
        });
    },
    onError(err) {
      getGraphQLErrors(err, 'ONLINE');
    },
    skip: !userData || !isSubscriptionActive,
    shouldResubscribe: true,
  });
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === 'background') {
        console.log('App has gone to the background');
        // Disconnect subscription when app goes to background
        setIsSubscriptionActive(false);
      }

      if (
        appState.current.match(/background|inactive/) &&
        nextAppState === 'active'
      ) {
        console.log('App is back to foreground');
        // Reconnect subscription when app comes back to foreground
        setIsSubscriptionActive(true);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Context.Provider
      value={{
        newMessages,
        setNewMessages,
        setUserTyping,
        userTyping,
        league,
        setLeague,
        leagueChat,
        setLeagueChat,
        pageChat_gift,
        setPageChat_gift,
        pageChat_isGiftTaken,
        setPageChat_isGiftTaken,
        pageChat,
        setPageChat,
        pageChat_IsGift,
        setPageChat_IsGift,
        rooms,
        setRooms,
        searchRoomSub,
        setSearchRoomSub,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useOnlineContext = () => useContext(Context);
