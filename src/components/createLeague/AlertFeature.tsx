import { BlurView } from 'expo-blur';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import IMPORTS from '../../../repeated_items/index';
import { CreateLeagueInput } from '../../types/league';

const Colors = IMPORTS.COLORS;
const fonts = IMPORTS.FONTS;
const TwoCards = IMPORTS.TWO_CARDS;
const cardsImages = IMPORTS.CARDS_IMAGES;
const backgroundsImages = IMPORTS.BACKGROUNDS_IMAGES;
import {
  LeagueFeature,
  ModalKeys,
  SetLeagueHandler,
} from '../../types/components/createLeague';

export default function AlertFeature({
  selectedFeature,
  setActiveFeatures,
  setLeagueHandler,
  setSelectedActiveFeature,
  setModalsHandler,
  league,
}: {
  selectedFeature: LeagueFeature;
  setActiveFeatures: (value: React.SetStateAction<LeagueFeature[]>) => void;
  setLeagueHandler: SetLeagueHandler;
  setSelectedActiveFeature: (
    value: React.SetStateAction<LeagueFeature | null>
  ) => void;
  setModalsHandler: (key: ModalKeys, value: boolean) => void;
  league: CreateLeagueInput;
}) {
  function handleRemove() {
    setLeagueHandler(selectedFeature.name, undefined);
    setSelectedActiveFeature(null);
    setActiveFeatures((prev) =>
      prev.filter((feature) => feature.name !== selectedFeature.name)
    );
  }
  function onEdit() {
    setModalsHandler((selectedFeature.name + 'Modal') as ModalKeys, true);
    setSelectedActiveFeature(null);
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
          تعديل الميزة
        </Text>
        <View>
          {selectedFeature.name === 'cardForm' && league.cardForm ? (
            <TwoCards
              img={cardsImages[league.cardForm as keyof typeof cardsImages]}
              leftCardStyle={{
                left: -15,
                bottom: 3.5,
              }}
            />
          ) : selectedFeature.name === 'roomBackground' &&
            league.roomBackground ? (
            <Image
              source={
                backgroundsImages[
                  league.roomBackground as keyof typeof backgroundsImages
                ]
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
              }}
            />
          ) : (
            <Image
              source={{
                uri: selectedFeature.img,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                resizeMode: 'center',
              }}
            />
          )}
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
            {selectedFeature.title}
          </Text>
          <Text
            style={{
              color: '#A5A5A7',
              fontFamily: fonts.almaraiRegular,
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {selectedFeature.description}
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
          <Pressable onPress={handleRemove}>
            <View
              style={{
                width: 149.5,
                height: 40,
                borderRadius: 8,
                backgroundColor: Colors.DANGER_600,
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '4px 4px 20.4px 7px rgba(246, 76, 76, 0.25)',
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
                إزالة
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={onEdit}>
            <View
              style={{
                width: 149.5,
                height: 40,
                borderRadius: 8,
                backgroundColor: Colors.BACKGROUND_5,
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '4px 4px 11.6px 0px rgba(253, 245, 233, 0.1)',
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
                تعديل
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => setSelectedActiveFeature(null)}
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
