import { View, Text, Pressable, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  Colors,
  fonts,
  TwoCards,
  cardsImages,
  sharedIcons,
} from '@abdlarahman/ui-components';
import { CreateLeagueInput } from '../../types/league';

interface FeatureCardProps {
  id: string;
  img: string | number;
  isSelected: boolean;
  onSelect: () => void;
  diamondValue?: number;
  icon?: string;
  name: keyof CreateLeagueInput;
}

export default function FeatureCard({
  id,
  isSelected,
  onSelect,
  img,
  diamondValue,
  icon,
  name,
}: FeatureCardProps) {
  return (
    <Pressable onPress={onSelect}>
      <View
        style={{
          width: 150.43,
          height: 150.43,
          backgroundColor: isSelected ? '#6A6560' : Colors.BACKGROUND_5,
          borderRadius: 14.72,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: isSelected ? 3 : 0,
          borderColor: isSelected ? Colors.PRIMARY_700 : 'transparent',
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {name === 'cardForm' ? (
            <TwoCards
              img={img as keyof typeof cardsImages}
              leftCardStyle={{
                left: 15,
                bottom: undefined,
                top: 20,
              }}
              imageStyle={{
                width: 75,
                height: 100,
                borderRadius: 3.53,
              }}
              boxShadow="-3.68px 0px 5.43px 0px rgba(0, 0, 0, 0.37)"
            />
          ) : (
            <Image
              source={typeof img === 'number' ? img : { uri: img }}
              style={{
                width: diamondValue ? 63 : '60%',
                height: diamondValue ? 80 : '80%',
                resizeMode: 'center',
              }}
            />
          )}
          {diamondValue ? (
            <View
              style={{
                width: 135.71,
                backgroundColor: Colors.BACKGROUND_4,
                borderRadius: 16,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                marginTop: 14.72,
              }}
            >
              <SvgXml xml={sharedIcons.diamond} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.almaraiRegular,
                  color: '#ffff',
                }}
              >
                {diamondValue.toLocaleString()}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
