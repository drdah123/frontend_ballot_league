// Constants
import FONTS from './repeated_items/constants/fonts';
import COLORS from './repeated_items/constants/Colors';
import IMAGES from './repeated_items/constants/Images';
import BACKGROUNDS_IMAGES from './repeated_items/constants/backgroundsImages';
import CARDS_IMAGES from './repeated_items/constants/cardsImages';

// Assets
import * as LEAGUE_ICONS from './repeated_items/assets/league/icons';
import * as SHARED_ICONS from './repeated_items/assets/shared/sharedIcons';

// Components - Chat
import * as CHAT_ICONS from './repeated_items/components/chat/icons';
import CHAT_MENU_ITEM from './repeated_items/components/chat/MenuItem';
import CHAT_MESSAGES from './repeated_items/components/chat/Messages';
import CHAT_PLAYER_MENU from './repeated_items/components/chat/PlayerMenu';
import * as CHAT_STYLES from './repeated_items/components/chat/styles';

// Components - CreateRoom
import CREATE_ROOM_SELECT from './repeated_items/components/createRoom/Select';

// Components - Friends
import * as FRIENDS_INDEX from './repeated_items/components/friends/Index';
import LINEAR_BUTTON_2 from './repeated_items/components/friends/linearButton2';
import * as FRIENDS_SVG from './repeated_items/components/friends/svg';

// Components - Shared
import APP_BLUR from './repeated_items/components/shared/AppBlur';
import AVATAR_WITH_4_CARDS from './repeated_items/components/shared/AvatarWith4Cards';
import HEADER_PROFILE_CARD from './repeated_items/components/shared/HeaderProfileCard';
import LINEAR_BUTTON from './repeated_items/components/shared/linearButton';
import MIX from './repeated_items/components/shared/Mix';
import TWO_CARDS from './repeated_items/components/shared/TwoCards';
import USER_CARD from './repeated_items/components/shared/UserCard';
import USER_CARD_MODAL from './repeated_items/components/shared/UserCardModal';

// Context
import * as GENERAL_CONTEXT from './repeated_items/context/generalContext';
import * as ONLINE_CONTEXT from './repeated_items/context/onlineContext';
import * as USER_CARD_MODAL_CONTEXT from './repeated_items/context/userCardModalContext';

// Reducers
import * as GENERAL_REDUCER from './repeated_items/reducers/GeneralReducer';

// Styles
import * as COMMON_STYLES from './repeated_items/styles/commonStyles';

// Types
import * as API_TYPES from './repeated_items/types/ApiTypes';
import * as CARD_TYPES from './repeated_items/types/cardTypes';
import * as CHAT_TYPES from './repeated_items/types/Chat';
import * as GID_TYPES from './repeated_items/types/GidTypes';
import * as LEAGUES_TYPES from './repeated_items/types/Leagues';
import * as MSHARIA_TYPE from './repeated_items/types/MshariaType';
import * as PLAYER_TYPE from './repeated_items/types/playerType';
import * as PLAYING_TYPE from './repeated_items/types/playingType';
import * as PROFILE_TYPES from './repeated_items/types/Profile';
import * as ROOM_TYPES from './repeated_items/types/RoomTypes';
import * as STORE_TYPES from './repeated_items/types/Store';

// Utils
import * as CHANGE_LEAGUE_ROUND from './repeated_items/utils/changeLeageRound';
import * as CHANGE_LEVELS_TO_AR from './repeated_items/utils/changeLevelsToAR';
import * as DISPLAY from './repeated_items/utils/Display';
import * as GET_GRAPHQL_ERRORS from './repeated_items/utils/getGraphqlErrors';

export const IMPORTS = {
  // Constants
  FONTS,
  COLORS,
  IMAGES,
  BACKGROUNDS_IMAGES,
  CARDS_IMAGES,

  // Assets
  LEAGUE_ICONS,
  SHARED_ICONS,

  // Components - Chat
  CHAT_ICONS,
  CHAT_MENU_ITEM,
  CHAT_MESSAGES,
  CHAT_PLAYER_MENU,
  CHAT_STYLES,

  // Components - CreateRoom
  CREATE_ROOM_SELECT,

  // Components - Friends
  FRIENDS_INDEX,
  LINEAR_BUTTON_2,
  FRIENDS_SVG,

  // Components - Shared
  APP_BLUR,
  AVATAR_WITH_4_CARDS,
  HEADER_PROFILE_CARD,
  LINEAR_BUTTON,
  MIX,
  TWO_CARDS,
  USER_CARD,
  USER_CARD_MODAL,

  // Context
  GENERAL_CONTEXT,
  ONLINE_CONTEXT,
  USER_CARD_MODAL_CONTEXT,

  // Reducers
  GENERAL_REDUCER,

  // Styles
  COMMON_STYLES,

  // Types
  API_TYPES,
  CARD_TYPES,
  CHAT_TYPES,
  GID_TYPES,
  LEAGUES_TYPES,
  MSHARIA_TYPE,
  PLAYER_TYPE,
  PLAYING_TYPE,
  PROFILE_TYPES,
  ROOM_TYPES,
  STORE_TYPES,

  // Utils
  CHANGE_LEAGUE_ROUND,
  CHANGE_LEVELS_TO_AR,
  DISPLAY,
  GET_GRAPHQL_ERRORS,
};
