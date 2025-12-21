import {
  DimensionValue,
  Image,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { cardsImages } from '@abdlarahman/shared';

export default function TwoCards({
  img,
  leftCardStyle,
  boxShadow,
  imageStyle,
}: {
  img: keyof typeof cardsImages;
  leftCardStyle?: ViewStyle;
  boxShadow?: ViewStyle['boxShadow'];
  imageStyle?: ImageStyle;
}) {
  return (
    <>
      <View
        style={{
          boxShadow: boxShadow || '-2.28px 0px 3.36px 0px #0000005E',
          zIndex: 1,
        }}
      >
        <Image
          source={
            typeof img === 'number'
              ? img
              : cardsImages[(img as keyof typeof cardsImages) || 'default']
          }
          style={[styles.image, imageStyle]}
        />
      </View>
      <View style={[styles.card, leftCardStyle]}>
        <Image
          source={
            typeof img === 'number'
              ? img
              : cardsImages[(img as keyof typeof cardsImages) || 'default']
          }
          style={[styles.image, imageStyle]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    transform: [{ rotate: '-10deg' }],
    position: 'absolute',
    left: -15,
    bottom: 3.5,
    zIndex: 0,
  },
  image: {
    width: 47,
    height: 61,
    borderRadius: 2.19,
  },
});
