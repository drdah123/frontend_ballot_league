import {
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import IMPORTS from '../../../repeated_items/index';
import type {
  ActionButtonsType,
  ChatMessage,
  ChatPageSub,
} from '../../../repeated_items/types/Chat';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../schema/league';
import { useToast } from 'react-native-toast-notifications';

const Colors = IMPORTS.COLORS;
const fonts = IMPORTS.FONTS;
const styles = IMPORTS.CHAT_STYLES;
const Images = IMPORTS.IMAGES;
const { svgs } = IMPORTS.FRIENDS_SVG;
const Messages = IMPORTS.CHAT_MESSAGES;
const { useUserCardModal } = IMPORTS.USER_CARD_MODAL_CONTEXT;

const { useOnlineContext } = IMPORTS.ONLINE_CONTEXT;
export default function Chat({
  leagueId,
  selectedTab,
}: {
  leagueId: string;
  selectedTab: 'overview' | 'plan' | 'chat';
}) {
  const toast = useToast();
  const [message, setMessage] = useState('');
  const [actionButtonUser, setActionButtonUser] =
    useState<ActionButtonsType>(null);
  const { showUserCard } = useUserCardModal();
  const { leagueChat, setLeagueChat } = useOnlineContext();
  function setChat(value: React.SetStateAction<ChatMessage[] | undefined>) {
    // Handle both function and direct value forms of setState
    if (typeof value === 'function') {
      // If it's a function, we need to call it with current chat state
      const currentChat =
        leagueChat?.map((chatPageSub) => ({
          _id: chatPageSub._id,
          text: chatPageSub.text,
          sender: chatPageSub.sender,
        })) || [];
      const newChat = value(currentChat);
      if (newChat && newChat.length > 0) {
        const editedChat: ChatPageSub[] = newChat.map((message) => ({
          ...message,
          state: 'send_message' as const,
        }));
        setLeagueChat((prev) => {
          if (!prev) return editedChat;
          return [...editedChat];
        });
      }
    } else if (value && value.length > 0) {
      // Direct value assignment - replace all chats
      const editedChat: ChatPageSub[] = value.map((message) => ({
        ...message,
        state: 'send_message' as const,
      }));
      setLeagueChat((prev) => {
        if (!prev) return editedChat;
        return [...editedChat];
      });
    }
  }
  const [sendMessage] = useMutation<
    MediaKeyMessageEvent,
    {
      leagueId: string;
      content: string;
    }
  >(SEND_MESSAGE);
  async function handleSendMessage() {
    if (message.trim()) {
      try {
        await sendMessage({
          variables: {
            leagueId,
            content: message,
          },
        });
        setMessage(''); // Clear the input field after sending the message
      } catch (error) {
        toast.show('Error sending message', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });
        console.error('Error sending message:', error);
      }
    }
  }

  return (
    <View
      style={[
        styles.viewContainer,
        {
          display: selectedTab === 'chat' ? 'flex' : 'none',
        },
      ]}
    >
      <ImageBackground
        style={[
          styles.background,
          {
            paddingBottom: 0,
          },
        ]}
        source={Images.BACKGROUND}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.1,
          flex: 1,
        }}
      >
        {leagueChat ? (
          <Messages
            chat={leagueChat}
            setActionButtonUser={setActionButtonUser}
            actionButtonUser={actionButtonUser}
            setChat={setChat}
          />
        ) : (
          <View
            style={{
              flex: 1,
            }}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <BlurView intensity={5} tint="dark" style={shadow.blurContainer2}>
            <View style={{ width: '100%', padding: 12 }}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: Colors.BACKGROUND_4,
                  borderRadius: 28,
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity onPress={handleSendMessage}>
                  <SvgXml xml={svgs.send} />
                </TouchableOpacity>
                <TextInput
                  placeholder="رسالتك..."
                  style={{
                    flex: 1,
                    fontFamily: fonts.almaraiRegular,
                    fontSize: 12,
                    color: Colors.DEFAULT_WHITE,
                    textAlign: 'right',
                  }}
                  placeholderTextColor="#9C9FA6"
                  value={message}
                  onChangeText={setMessage}
                />
              </View>
            </View>
          </BlurView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
const shadow = StyleSheet.create({
  text: {
    color: Colors.PRIMARY_600,
    fontFamily: fonts.almaraiRegular,
  },
  blurContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  blurContainer2: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
});
