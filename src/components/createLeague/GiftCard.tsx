import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import IMPORTS from '../../../repeated_items/index';

const LinearButton2 = IMPORTS.LINEAR_BUTTON_2;
const Colors = IMPORTS.COLORS;
const fonts = IMPORTS.FONTS;

interface GiftCardProps {
  svg: string;
  text: string;
  buttonText: string;
  onPress: () => void;
}

const GiftCard: React.FC<GiftCardProps> = ({
  svg,
  text,
  buttonText,
  onPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <SvgXml xml={svg} />
      <Text style={styles.cardText}>{text}</Text>
      <View>
        <LinearButton2
          text={buttonText}
          onPress={onPress}
          containerStyle={{
            width: 129.06,
            height: 28,
            shadowColor: '#FFAF36',
            elevation: 5,
          }}
          linearStyle={{
            width: 129.06,
            height: 28,
            paddingVertical: 0,
          }}
        />
      </View>
    </View>
  );
};

export default GiftCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.BACKGROUND_5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    gap: 14,
    borderRadius: 14,
    paddingHorizontal: 7,
  },
  cardText: {
    color: Colors.DEFAULT_WHITE,
    textAlign: 'center',
    fontSize: 13.12,
    fontFamily: fonts.almaraiBold,
  },
});
