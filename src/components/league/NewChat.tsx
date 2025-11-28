import React, { useState, useCallback, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import IMPORTS from '../../../repeated_items/index';

const { svgs } = IMPORTS.FRIENDS_SVG;
const Colors = IMPORTS.COLORS;
const fonts = IMPORTS.FONTS;

const { width } = Dimensions.get('window');

const MessageBubble = ({ username, message, isUser, onLongPress }: any) => {
  const bottomSheetRef = useRef<any>(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const openBottomSheet = useCallback(() => {
    setBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  }, []);

  // Function to close the bottom sheet
  const closeBottomSheet = useCallback(() => {
    setBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  }, []);
  if (isUser) {
    // If the message is from the user, apply custom style for user messages
    return (
      <TouchableWithoutFeedback onLongPress={onLongPress}>
        <View style={styles.userReplyContainer}>
          <View style={styles.replyBubble}>
            <Text style={styles.replyText}>{message}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onLongPress={onLongPress}>
      <View style={styles.messageContent}>
        <SvgXml xml={svgs.profile} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.username}>{username}</Text>
          {Array.isArray(message) ? (
            message.map((text, index) => (
              <View key={index} style={styles.messageBubble}>
                <Text style={styles.messageText}>{text}</Text>
              </View>
            ))
          ) : (
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const NewChat = ({ messages }: any) => {
  const [showActions, setShowActions] = useState(false);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });

  const hideActions = () => {
    setShowActions(false);
  };

  return (
    <TouchableWithoutFeedback onPress={hideActions}>
      <View style={{ flex: 1 }}>
        {showActions && (
          <TouchableOpacity
            activeOpacity={1} // Prevents the opacity change on tap
            onPress={() => {}} // Prevents the outer TouchableWithoutFeedback from being triggered
            style={[
              styles.actionsContainer,
              { top: actionPosition.top - 50, left: actionPosition.left - 60 },
            ]}
          >
            <View style={styles.actionsWrapper}>
              {['ملف اللاعب', 'حظر واسكات', 'تبليغ'].map((label, index) => (
                <View key={index} style={styles.actionButton}>
                  <Text style={styles.actionText}>{label}</Text>
                </View>
              ))}
              <View style={styles.arrowContainer}>
                <SvgXml xml={svgs.downAroow} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <ScrollView style={styles.scrollView}>
          <View style={styles.userReplyContainer}>
            <View style={styles.replyBubble}>
              <Text style={styles.replyText}>
                السلام عليكم ورحمة الله وبركاته
              </Text>
            </View>
          </View>

          {messages.map((msg: any, index: number) => (
            <MessageBubble
              key={index}
              username={msg.username}
              message={msg.message}
              isUser={msg.username === 'You'}
            />
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    position: 'absolute',
    zIndex: 8,
  },
  actionsWrapper: {
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 8,
    padding: 9,
    flexDirection: 'row-reverse',
    gap: 4,
  },
  actionButton: {
    width: 78,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: Colors.BACKGROUND_4,
  },
  actionText: {
    color: Colors.PRIMARY_600,
    fontSize: 12,
    fontFamily: fonts.almaraiRegular,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: -18,
    left: 120,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 16,
  },
  messageContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  username: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 12,
    color: 'white',
  },
  messageBubble: {
    backgroundColor: '#848A95',
    padding: 8,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  messageText: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 12,
    color: 'white',
  },
  userReplyContainer: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginTop: 20,
  },
  replyBubble: {
    backgroundColor: Colors.BACKGROUND_3,
    padding: 8,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  replyText: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 12,
    color: Colors.PRIMARY_600,
  },
});

export default NewChat;
