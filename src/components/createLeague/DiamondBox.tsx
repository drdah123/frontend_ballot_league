import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import IMPORTS from '../../../repeated_items/index';
import { icons } from './icons';

const fonts = IMPORTS.FONTS;
const LinearButton2 = IMPORTS.LINEAR_BUTTON_2;
const Colors = IMPORTS.COLORS;
interface DiamondBoxProps {
  diamondAmount: number;
  price: string;
  onPress: () => void;
}

export default function DiamondBox({
  diamondAmount,
  price,
  onPress,
}: DiamondBoxProps) {
  return (
    <View style={styles.box}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text
          style={{
            color: '#ffff',
            fontFamily: fonts.almaraiBold,
            fontSize: 13.12,
            textAlign: 'center',
          }}
        >
          {diamondAmount} ألماسة
        </Text>
        <SvgXml xml={icons.dimond} />
      </View>
      <View style={{ width: '85%' }}>
        <LinearButton2
          text={`شراء بـ ${price} ر.س`}
          textStyles={{ fontSize: 8.75, fontFamily: fonts.almaraiBold }}
          onPress={onPress}
          containerStyle={{
            width: '100%',
            height: 25,
          }}
          linearStyle={{
            width: '100%',
            height: 25,
            paddingVertical: 0,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 139.05,
    height: 73,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 14,
  },
});
