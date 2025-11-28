import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import Colors from '../../constants/Colors';
import { SvgXml } from 'react-native-svg';
import { icons } from './icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { BLOCK_USER } from '../../schema/block';
import { RootState } from '../../store';
import { setUserData, UserDataType } from '../../reducers/GeneralReducer';
import StorageService from '../../services/StorageService';
import { ActionButtonsType, ChatMessage } from '../../app/(tabs)/Chat';
import { useToast } from 'react-native-toast-notifications';
import { MessageWithSuccess } from '../../types/ApiTypes';
import { useUserCardModal } from '../../context/userCardModalContext';
export interface MenuItemProps {
  text: string;
  onPress?: () => void;
}

export interface PlayerMenuProps {
  setActionButtonUser: React.Dispatch<React.SetStateAction<ActionButtonsType>>;
  actionButtonUser: ActionButtonsType;
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[] | undefined>>;
}
export default function PlayerMenu({
  actionButtonUser,
  setActionButtonUser,
  setChat,
}: PlayerMenuProps) {
  const { showUserCard } = useUserCardModal();
  const menuItems = [
    { text: 'تبليغ', onPress: undefined },
    { text: 'حظر واسكات', onPress: blockHandler },
    {
      text: 'ملف اللاعب',
      onPress: actionButtonUser
        ? () => showUserCard(actionButtonUser.userId)
        : undefined,
    },
  ];
  const toast = useToast();
  const dispatch = useDispatch();
  const [block] = useMutation<
    {
      blockUser: MessageWithSuccess & {
        userId: string;
      };
    },
    { userEmailOrId: string }
  >(BLOCK_USER);
  const userData = useSelector<RootState, UserDataType | null>(
    (state) => state.generalState.userData
  );
  async function blockHandler() {
    if (!actionButtonUser || !userData) return;
    try {
      const { data } = await block({
        variables: {
          userEmailOrId: actionButtonUser.userId,
        },
      });
      if (data && data.blockUser) {
        const blocked = userData.blocked.concat(data.blockUser.userId);

        const friends = userData.friends.filter(
          (id) => id !== data.blockUser.userId
        );
        const likesGiven = userData.likesGiven.filter(
          (id) => id !== data.blockUser.userId
        );
        await StorageService.setUserData({
          ...userData,
          blocked,
          friends,
          likesGiven,
        });
        dispatch(setUserData({ ...userData, blocked, friends, likesGiven }));
        userData.blocked;
        setChat((prv) => {
          prv = prv?.filter((msg) => !blocked.includes(msg.sender._id));
          return prv;
        });
      }
      toast.show('تم حظر اللاعب', {
        type: 'success',
      });
      setActionButtonUser(null);
    } catch (error) {
      console.log(
        `🚀 ~ file: PlayerMenu.tsx:80 ~ blockHandler ~ error:`,
        error
      );
      toast.show('حدث خطأ ما', {
        type: 'danger',
      });
    }
  }
  return (
    <View style={styles.menuContainer}>
      <MenuItem
        key={menuItems[0].text}
        text={menuItems[0].text}
        onPress={menuItems[0].onPress}
      />
      <MenuItem
        key={menuItems[1].text}
        text={menuItems[1].text}
        onPress={menuItems[1].onPress}
      />
      <MenuItem
        key={menuItems[2].text}
        text={menuItems[2].text}
        onPress={menuItems[2].onPress}
      />
      <SvgXml
        style={{
          position: 'absolute',
          left: '5%',
          bottom: '-40%',
        }}
        xml={icons[0].DownArrow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    borderRadius: 12,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.BACKGROUND_5,
    width: 258,
    padding: 8,
    gap: 4,
    flexDirection: 'row',
    bottom: 50,
    shadowColor: 'rgba(231, 231, 231, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 19.7,
    elevation: 10,
  },
});
