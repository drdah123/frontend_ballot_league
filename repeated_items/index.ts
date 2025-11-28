// Constants
import FONTS from './constants/fonts';
import COLORS from './constants/Colors';
import IMAGES from './constants/Images';
import BACKGROUNDS_IMAGES from './constants/backgroundsImages';
import CARDS_IMAGES from './constants/cardsImages';

// Assets
import LEAGUE_ICONS from './assets/league/icons';
import SHARED_ICONS from './assets/shared/sharedIcons';

// Components - Chat
import * as CHAT_ICONS from './components/chat/icons';
import CHAT_MENU_ITEM from './components/chat/MenuItem';
import CHAT_MESSAGES from './components/chat/Messages';
import CHAT_PLAYER_MENU from './components/chat/PlayerMenu';
import CHAT_STYLES from './components/chat/styles';

// Components - CreateRoom
import CREATE_ROOM_SELECT from './components/createRoom/Select';

// Components - Friends
import FRIENDS_INDEX from './components/friends/Index';
import LINEAR_BUTTON_2 from './components/friends/linearButton2';
import * as FRIENDS_SVG from './components/friends/svg';

// Components - Shared
import APP_BLUR from './components/shared/AppBlur';
import AVATAR_WITH_4_CARDS from './components/shared/AvatarWith4Cards';
import HEADER_PROFILE_CARD from './components/shared/HeaderProfileCard';
import LINEAR_BUTTON from './components/shared/linearButton';
import MIX from './components/shared/Mix';
import TWO_CARDS from './components/shared/TwoCards';
import USER_CARD from './components/shared/UserCard';
import USER_CARD_MODAL from './components/shared/UserCardModal';
import HEADER from './components/shared/Header';

// Context
import * as GENERAL_CONTEXT from './context/generalContext';
import * as ONLINE_CONTEXT from './context/onlineContext';
import * as USER_CARD_MODAL_CONTEXT from './context/userCardModalContext';

// Reducers
import * as GENERAL_REDUCER from './reducers/GeneralReducer';

// Styles
import * as COMMON_STYLES from './styles/commonStyles';

// Utils
import CHANGE_LEAGUE_ROUND from './utils/changeLeageRound';
import CHANGE_LEVELS_TO_AR from './utils/changeLevelsToAR';
import DISPLAY from './utils/Display';
import GET_GRAPHQL_ERRORS from './utils/getGraphqlErrors';

export default {
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
  HEADER,

  // Context
  GENERAL_CONTEXT,
  ONLINE_CONTEXT,
  USER_CARD_MODAL_CONTEXT,

  // Reducers
  GENERAL_REDUCER,

  // Styles
  COMMON_STYLES,

  // Utils
  CHANGE_LEAGUE_ROUND,
  CHANGE_LEVELS_TO_AR,
  DISPLAY,
  GET_GRAPHQL_ERRORS,
};
