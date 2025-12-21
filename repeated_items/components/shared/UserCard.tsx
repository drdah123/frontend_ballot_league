import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { icons } from '../chat/icons';
import { Colors, fonts, Display } from '@abdlarahman/shared';
import {
  MessageWithSuccess,
  RealPlayerType,
  ResWith_id,
} from '../../types/ApiTypes';
import LinearButton from './linearButton';
import { useMutation, useQuery } from '@apollo/client';
import { USER_CARD_PROFILE } from '../../schema/chat';
import HeaderProfileCard from './HeaderProfileCard';
import { useRouter } from 'expo-router';
import {
  CANCEL_FRIEND_REQUEST,
  CancelFriendRequestType,
  DELETE_FRIEND,
  LIKE_USER,
  LikeUserType,
  RemoveFriendType,
  SEND_FRIEND_REQUEST,
  SendFriendRequestType,
  UNLIKE_USER,
  UnLikeUserType,
} from '../../schema/friend';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setUserData, UserDataType } from '../../reducers/GeneralReducer';
import { SEND_GIFT_FOR_ONE } from '../../schema/auth';
import { useAppContext } from '../../context/context';

// ! need to add gift component
export interface UserCard extends RealPlayerType {
  _id: string;
  likesNum: number;
  leagueNum: number;
  achievementsNum: number;
  bio: string;
}

export default function UserCard({
  userId,
  back,
}: {
  userId: string | null;
  back(): void;
}) {
  const { setAlert } = useAppContext();
  if (!userId) return null;
  const router = useRouter();
  const dispatch = useDispatch();
  const [like] = useMutation<LikeUserType, { userEmailOrId: string }>(
    LIKE_USER
  );

  const [isGift, setIsGift] = useState(false);
  const [unlike] = useMutation<UnLikeUserType, { userEmailOrId: string }>(
    UNLIKE_USER
  );
  const [gift] = useMutation<
    MessageWithSuccess & {
      user_diamond: number;
    },
    {
      gift: {
        receiver: string;
        value: number;
        message: string;
        type: 'diamond' | 'sub';
      };
    }
  >(SEND_GIFT_FOR_ONE);
  const [send] = useMutation<SendFriendRequestType, { toUser: string }>(
    SEND_FRIEND_REQUEST
  );
  const [cancelFriendRequest] = useMutation<
    CancelFriendRequestType,
    { _id: string; typeId: 'request' | 'user' }
  >(CANCEL_FRIEND_REQUEST);

  const [deleteFriend] = useMutation<
    RemoveFriendType,
    { userEmailOrId: string }
  >(DELETE_FRIEND);
  const user = useSelector<RootState, UserDataType | null>(
    (state) => state.generalState.userData
  );
  const { data } = useQuery<{ getMiniProfile: UserCard }>(USER_CARD_PROFILE, {
    variables: { userId },
  });
  const userProfile = useMemo<UserCard | undefined>(
    () => data?.getMiniProfile,
    [data]
  );
  const isLiked = useMemo(
    () => user?.likesGiven.includes(userId),
    [user, userId]
  );
  const isFriend = useMemo(
    () => user?.friends.includes(userId),
    [user, userId]
  );
  const isSentRequest = useMemo(
    () => user?.friendRequests.includes(userId),
    [user, userId]
  );

  async function add() {
    if (!userId) return;
    try {
      const { data } = await send({ variables: { toUser: userId } });
      if (data?.sendFriendRequest.status === 'PENDING' && user) {
        const newUser = {
          ...user,
          friendRequests: [...user.friendRequests, userId],
        };
        dispatch(setUserData(newUser));
      }
    } catch (e) {
      console.log(`🚀 ~ file: UserCard.tsx:61 ~ add ~ e:`, e);
    }
  }
  async function cancelFriendReqHandler() {
    if (!userId) return;
    try {
      const { data } = await cancelFriendRequest({
        variables: { _id: userId, typeId: 'user' },
      });
      if (data && data.cancelFriendRequest.success && user) {
        const newUser = {
          ...user,
          friendRequests: data.cancelFriendRequest._id
            ? user.friendRequests.filter(
                (id) => id !== data.cancelFriendRequest._id
              )
            : user.friendRequests.filter((id) => id !== userId),
        };
        dispatch(setUserData(newUser));
        setAlert(null);
      }
    } catch (error) {
      console.log(
        `🚀 ~ file: UserCard.tsx:123 ~ deleteFriendReqHandler ~ error:`,
        error
      );
    }
  }
  async function deleteHandler() {
    if (!userId) return;
    try {
      const { data } = await deleteFriend({
        variables: { userEmailOrId: userId },
      });
      if (data && data.deleteFriend.success && user) {
        const newUser = {
          ...user,
          friends: user.friends.filter((id) => id !== data.deleteFriend._id),
        };
        dispatch(setUserData(newUser));
        setAlert(null);
      }
    } catch (e) {
      console.log(`🚀 ~ file: UserCard.tsx:132 ~ deleteHandler ~ e:`, e);
    }
  }
  async function likeHandler() {
    if (!userId) return;
    try {
      const { data } = await like({ variables: { userEmailOrId: userId } });
      if (data?.likeUser.success && user) {
        const newUser = { ...user, likesGiven: [...user.likesGiven, userId] };
        dispatch(setUserData(newUser));
        setAlert(null);
      }
    } catch (error) {
      console.log(`🚀 ~ file: UserCard.tsx:69 ~ likeHandler ~ error:`, error);
    }
  }
  async function unlikeHandler() {
    if (!userId) return;
    try {
      const { data } = await unlike({ variables: { userEmailOrId: userId } });
      if (data?.unlikeUser.success && user) {
        const newUser = {
          ...user,
          likesGiven: user.likesGiven.filter((id) => id !== userId),
        };
        dispatch(setUserData(newUser));
        setAlert(null);
      }
    } catch (error) {
      console.log(`🚀 ~ file: UserCard.tsx:77 ~ unlikeHandler ~ error:`, error);
    }
  }
  async function giftHandler() {
    if (!userId) return;
    try {
      const { data } = await gift({
        variables: {
          gift: {
            receiver: userId,
            value: 1,
            message: 'test',
            type: 'diamond',
          },
        },
      });
      console.log(`🚀 ~ file: UserCard.tsx:142 ~ giftHandler ~ data:`, data);
    } catch (error) {
      console.log(`🚀 ~ file: UserCard.tsx:142 ~ giftHandler ~ error:`, error);
    }
  }
  if (!userProfile) return null;
  return (
    <>
      <Pressable
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 10,
        }}
        onPress={back}
      />

      <View style={styles.cardContainer}>
        {isGift ? null : null}
        <HeaderProfileCard user={userProfile} isMini />
        <View style={[styles.textContainer, { marginBottom: 20 }]}>
          <Text style={styles.generalText}>
            {userProfile.bio ? userProfile.bio : 'لا توجد نبذة عامة'}
          </Text>
        </View>
        <View style={styles.firstContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.smallButton,
                {
                  backgroundColor:
                    isFriend || isSentRequest
                      ? Colors.SECONDARY_500
                      : Colors.DEFAULT_WHITE,
                },
              ]}
              onPress={
                isFriend && !isSentRequest
                  ? () =>
                      setAlert({
                        message: 'هل تريد حذف الصديق؟',
                        buttonText: 'حذف',
                        cancelText: 'الغاء',
                        confirmFun: deleteHandler,
                        cancelFun: () => setAlert(null),
                      })
                  : isSentRequest
                  ? () =>
                      setAlert({
                        message: 'هل تريد الغاء طلب الصداقة؟',
                        buttonText: 'نعم',
                        cancelText: 'لا',
                        confirmFun: cancelFriendReqHandler, // use delete friend request
                        cancelFun: () => setAlert(null),
                      })
                  : add
              }
            >
              {isFriend || isSentRequest ? (
                <SvgXml xml={icons[0].deleteFriend} />
              ) : (
                <SvgXml xml={icons[0].addB} />
              )}
              <Text
                style={[
                  styles.buttonTextWhite,
                  {
                    color:
                      isFriend || isSentRequest
                        ? Colors.DEFAULT_WHITE
                        : Colors.BACKGROUND_5,
                  },
                ]}
              >
                {isFriend && !isSentRequest
                  ? 'ازالة'
                  : isSentRequest
                  ? 'الغاء الطلب '
                  : 'إضافة'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                isLiked
                  ? () =>
                      setAlert({
                        message: 'هل تريد ازالة الاعجاب؟',
                        buttonText: 'نعم',
                        cancelText: 'الغاء',
                        confirmFun: unlikeHandler,
                        cancelFun: () => setAlert(null),
                      })
                  : likeHandler
              }
              style={[
                styles.smallButton,
                {
                  backgroundColor: isLiked
                    ? Colors.DANGER_600
                    : Colors.DEFAULT_WHITE,
                },
              ]}
            >
              {isLiked ? (
                <SvgXml xml={icons[0].brokenHeart} />
              ) : (
                <SvgXml xml={icons[0].heartB} />
              )}
              <Text
                style={[
                  styles.buttonTextWhite,
                  {
                    color: isLiked ? Colors.DEFAULT_WHITE : Colors.BACKGROUND_5,
                  },
                ]}
              >
                {isLiked ? 'ازالة الاعجاب' : 'إعجاب'}
              </Text>
            </TouchableOpacity>
            <LinearButton
              containerStyle={{ flex: 1 }}
              linearStyle={styles.linearButton}
              onPress={() => setIsGift(true)}
            >
              <SvgXml xml={icons[0].gift} stroke={Colors.DEFAULT_WHITE} />
              <Text style={styles.buttonText}>إهداء</Text>
            </LinearButton>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: 'Profile',
                params: { user: JSON.stringify(userProfile) },
              });
              back();
            }}
            style={styles.bigButton}
          >
            <Text style={styles.bigButtonText}>مشاهدة الملف الكامل</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={back} style={styles.returnButton}>
          <Text style={styles.returnButtonText}>عودة</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const commonStyles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6.59,
    flexDirection: 'row-reverse',
  },
});

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_5,
    paddingHorizontal: 16,
    paddingBottom: 20,
    position: 'absolute',
    bottom: Display.setHeight(25),
    borderRadius: 16,
    width: '90%',
    zIndex: 10,
    left: '5%',
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: 19.5,
    paddingBottom: 20,
  },
  centeredContainer: {
    width: '100%',
    ...commonStyles.centered,
  },
  userNameText: {
    fontFamily: fonts.almaraiBold,
    color: Colors.DEFAULT_WHITE,
    fontSize: 8,
  },
  userInfoContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  userStatsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontFamily: fonts.almaraiRegular,
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    marginBottom: 1,
  },
  userImageContainer: {
    position: 'relative',
    bottom: '-2%',
    ...commonStyles.centered,
  },
  userImage: {
    width: 93,
    height: 93,
    borderRadius: 2000,
  },
  userLevelText: {
    fontFamily: fonts.almaraiBold,
    color: Colors.DEFAULT_WHITE,
    fontSize: 8,
  },
  textContainer: {
    width: '100%',
    ...commonStyles.centered,
  },
  generalText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
  },
  firstContainer: {
    borderRadius: 12,
    backgroundColor: Colors.BACKGROUND_4,
    padding: 12,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: Display.setWidth(2),
  },
  smallButton: {
    flex: 1,
    gap: 7,
    minHeight: 30,
    ...commonStyles.button,
  },
  whiteBackground: {
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  buttonTextWhite: {
    color: Colors.BACKGROUND_5,
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
  },
  linearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6.59,
    flexDirection: 'row-reverse',
    height: 30,
    marginBottom: 0,
    paddingVertical: 0,
    boxShadow: '3.29px 3.29px 16.8px 2.47px rgba(239, 176, 84, 0.25)',
  },
  bigButton: {
    width: '100%',
    borderRadius: 8,
    ...commonStyles.centered,
    height: 40,
    backgroundColor: Colors.BACKGROUND_5,
  },
  bigButtonText: {
    color: Colors.PRIMARY_500,
    fontFamily: fonts.almaraiBold,
    fontSize: 14,
  },
  returnButton: {
    width: '100%',
    borderRadius: 8,
    ...commonStyles.centered,
    backgroundColor: Colors.BACKGROUND_3,
    marginTop: 20,
    height: 40,
  },
  returnButtonText: {
    color: Colors.DEFAULT_WHITE,
    opacity: 0.5,
    fontFamily: fonts.almaraiBold,
    fontSize: 14,
  },
});
