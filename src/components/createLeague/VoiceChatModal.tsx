import { BlurView } from 'expo-blur';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import IMPORTS from '../../../repeated_items/index';
import { SetLeagueHandler } from '../../types/components/createLeague';

const Colors = IMPORTS.COLORS;
const fonts = IMPORTS.FONTS;
const LinearButton = IMPORTS.LINEAR_BUTTON;

type Props = {
  img: string;
  title: string;
  description: string;
  setLeagueHandler: SetLeagueHandler;
  setModalsHandler: () => void;
};

export default function VoiceChatModal({
  img,
  setLeagueHandler,
  title,
  description,
  setModalsHandler,
}: Props) {
  function confirmAddFeature() {
    setLeagueHandler('voiceChat', true);
    setModalsHandler();
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
      }}
    >
      <BlurView
        intensity={100}
        blurReductionFactor={10}
        tint="dark"
        style={[StyleSheet.absoluteFill, { backgroundColor: '#39404d28' }]}
      />
      <View
        style={{
          backgroundColor: Colors.BACKGROUND_3,
          padding: 16,
          borderRadius: 16,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: fonts.almaraiRegular,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          اضافة ميزة
        </Text>
        <View>
          <Image
            source={{
              uri: img,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              resizeMode: 'center',
            }}
          />
        </View>
        <View style={styles.textsContainer}>
          <Text
            style={{
              color: '#ffff',
              fontFamily: fonts.almaraiBold,
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: '#A5A5A7',
              fontFamily: fonts.almaraiRegular,
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginTop: 16,
          }}
        >
          <LinearButton onPress={confirmAddFeature} text="تأكيد" />
        </View>
      </View>
      <Pressable
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={setModalsHandler}
      >
        <View
          style={{
            width: '90%',
            backgroundColor: 'rgba(57, 64, 77, 0.7)',
            marginTop: 19.5,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              color: '#ffff',
              fontFamily: fonts.almaraiBold,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            عودة
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  textsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
  },
});
