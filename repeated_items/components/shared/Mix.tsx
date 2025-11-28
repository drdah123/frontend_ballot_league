import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  Dimensions,
  Image,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { svgs } from '../friends/svg';
import fonts from '../../constants/fonts';
import { OtherUserType } from '../../types/ApiTypes';
import Images from '../../constants/Images';
import cardsImages from '../../constants/cardsImages';

function Mix({
  linearStyle,
  user,
}: {
  linearStyle?: ViewStyle;
  user: OtherUserType;
}) {
  const { width, height } = Dimensions.get('window');
  return (
    // Layer Blur messing
    <LinearGradient
      start={{ x: 0.5, y: 0.589 }}
      end={{ x: 0.5, y: 1.2877 }}
      style={[
        {
          backgroundColor: Colors.BACKGROUND_4,
          borderRadius: 15,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: width * 0.285,
          height: height * 0.078,
        },
        linearStyle,
      ]}
      colors={[Colors.BACKGROUND_5, Colors.PRIMARY_600]}
    >
      {/* <BlurView
        intensity={3}
        tint="regular"
        experimentalBlurMethod="dimezisBlurView"
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 15,
          overflow: 'hidden',
        }}
      /> */}
      <View style={{ flexDirection: 'row-reverse', width: '100%' }}>
        <View style={{ position: 'relative', top: -5 }}>
          <View
            style={{
              marginTop: -10,
              marginRight: 1,
            }}
          >
            <Image
              source={user.pic?.url ? { uri: user.pic.url } : Images.EAGLE}
              style={{
                width: 70,
                height: 70,
                borderRadius: 100,
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: -20,
              top: 25,
              transform: [{ rotate: '10deg' }],
            }}
          >
            <View
              style={{
                boxShadow: '-0.85px 0px 1.26px rgba(0, 0, 0, 0.37)',
                position: 'absolute',
                right: 25,
                bottom: -30,
              }}
            >
              <Image
                source={cardsImages[user.skins.choseSkin || 'default']}
                style={{
                  width: 20,
                  height: 25,
                }}
              />
            </View>
            <View
              style={{
                boxShadow: '-0.85px 0px 1.26px rgba(0, 0, 0, 0.37)',
                position: 'absolute',
                right: 20,
                transform: [{ rotate: '15deg' }],
                bottom: -30,
              }}
            >
              <Image
                source={cardsImages[user.skins.choseSkin || 'default']}
                style={{
                  width: 20,
                  height: 25,
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'relative',
            flex: 1.5,
            marginLeft: 15,
            top: -6,
            width: '100%',
            zIndex: 10000,
          }}
        >
          <View style={{}}>
            <SvgXml xml={svgs.logo} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 18,
              right: 8,
              width: '100%',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.almaraiBold,
                color: Colors.PRIMARY_700,
                fontSize: 10.29,
                textShadowColor: '#FFCF0B',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 1,
              }}
            >
              مخضرم
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '95%',
          backgroundColor: Colors.BACKGROUND_4,
          borderRadius: 17,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 2.5,
          boxShadow: '0px 4.74px 6.16px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Text
          style={{
            fontFamily: fonts.almaraiBold,
            color: Colors.DEFAULT_WHITE,
            fontSize: 8,
          }}
        >
          {user?.name || 'مستخدم مجهول'}
        </Text>
        <View
          style={{
            shadowColor: Colors.BACKGROUND_5,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 3,
          }}
        >
          <SvgXml
            style={{
              shadowColor: '#F3C91D',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 4.1,
              elevation: 4,
            }}
            xml={svgs.crown}
            width={20}
            height={20}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default Mix;
