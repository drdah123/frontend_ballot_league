import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { fonts, Colors, Display, Images } from '@abdlarahman/shared';
import { ActionButtonsType, ChatMessage } from '../../app/(tabs)/Chat';
import { useSelector } from 'react-redux';
import { UserDataType } from '../../reducers/GeneralReducer';
import { useUserCardModal } from '../../context/userCardModalContext';
import { RootState } from '../../store';
import PlayerMenu from './PlayerMenu';

// ? maybe there is problem with touch massage because of margin bottom with the same sender
export default function Messages({
  chat,
  setActionButtonUser,
  actionButtonUser,
  setChat,
}: {
  chat: ChatMessage[];
  setActionButtonUser: React.Dispatch<React.SetStateAction<ActionButtonsType>>;
  actionButtonUser: ActionButtonsType;
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[] | undefined>>;
}) {
  const { showUserCard } = useUserCardModal();
  const user = useSelector<RootState, UserDataType | null>(
    (state) => state.generalState.userData
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          width: '100%',
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
      >
        {chat.map((message, index) =>
          user && message.sender._id === user._id ? (
            <View
              key={message._id}
              style={[
                styles.messageContent2,
                {
                  marginBottom:
                    chat.length - 1 === index ? Display.setHeight(25) : 0,
                },
              ]}
            >
              <View
                style={{
                  backgroundColor: Colors.BACKGROUND_3,
                  padding: 8,
                  borderTopEndRadius: 8,
                  borderTopStartRadius: 8,
                  borderBottomStartRadius: 8,
                  marginTop: 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    fontSize: 12,
                    color: Colors.PRIMARY_600,
                    borderTopEndRadius: 8,
                    flexWrap: 'wrap',
                    maxWidth: Display.setWidth(50),
                  }}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ) : (
            <View
              key={message._id + index}
              style={[
                {
                  ...styles.user,
                  position: 'relative',
                  bottom:
                    chat[index + 1] &&
                    chat[index + 1].sender._id === message.sender._id
                      ? -10
                      : 0,
                  left:
                    chat[index + 1] &&
                    chat[index + 1].sender._id === message.sender._id
                      ? 46
                      : 0,
                  marginTop:
                    chat[index + 1] &&
                    chat[index + 1].sender._id === message.sender._id
                      ? 5
                      : 0,
                },
                {
                  marginBottom:
                    chat.length - 1 === index ? Display.setHeight(25) : 0,
                },
              ]}
            >
              <View style={{ gap: 16 }}>
                <View style={styles.messageContent}>
                  <TouchableOpacity
                    onPress={() =>
                      setActionButtonUser((prv) =>
                        prv && prv.messageId === message._id
                          ? null
                          : {
                              messageId: message._id,
                              userId: message.sender._id,
                            }
                      )
                    }
                  >
                    <Image
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 100,
                        display:
                          chat[index + 1] &&
                          chat[index + 1].sender._id === message.sender._id
                            ? 'none'
                            : 'flex',
                      }}
                      source={
                        message.sender.pic && message.sender.pic.url
                          ? { uri: message.sender.pic.url }
                          : Images.EAGLE
                      }
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'column',
                    }}
                  >
                    {actionButtonUser &&
                    actionButtonUser.messageId === message._id ? (
                      <PlayerMenu
                        actionButtonUser={actionButtonUser}
                        setActionButtonUser={setActionButtonUser}
                        setChat={setChat}
                      />
                    ) : null}
                    {chat[index - 1] &&
                    chat[index - 1].sender._id === message.sender._id ? null : (
                      <Text
                        style={{
                          fontFamily: fonts.almaraiRegular,
                          fontSize: 14,
                          color: Colors.DEFAULT_WHITE,
                          marginBottom: Display.setWidth(2),
                        }}
                      >
                        {message.sender.name}
                      </Text>
                    )}
                    <View style={{ flexDirection: 'column' }}>
                      <TouchableOpacity
                        onPress={() =>
                          setActionButtonUser((prv) =>
                            prv && prv.messageId === message._id
                              ? null
                              : {
                                  messageId: message._id,
                                  userId: message.sender._id,
                                }
                          )
                        }
                        style={{
                          backgroundColor: '#848A95',
                          padding: 8,
                          borderTopEndRadius: 8,
                          borderTopStartRadius: 8,
                          borderBottomEndRadius: 8,
                          boxShadow: '0px 4px 6.5px 0px rgba(90, 90, 90, 0.15)',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.almaraiRegular,
                            fontSize: 12,
                            color: Colors.DEFAULT_WHITE,
                            borderTopEndRadius: 8,
                          }}
                        >
                          {message.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    width: '100%',
  },
  messageContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  messageContent2: {
    flexDirection: 'row-reverse',
    gap: 8,
  },
});
