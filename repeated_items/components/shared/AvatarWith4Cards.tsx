import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/Colors';
import cardsImages from '../../constants/cardsImages';
import { LeagueType } from '../../types/league';
import Images from '../../constants/Images';
import { icons } from '../chat/icons';
import fonts from '../../constants/fonts';

export default function AvatarWith4Cards({
  league,
  style,
  cardGroupRight,
  cardGroupLeft,
  creatorImageStyle,
  cardImageStyle,
}: {
  league: LeagueType;
  style?: ViewStyle;
  cardGroupRight?: ViewStyle;
  cardGroupLeft?: ViewStyle;
  creatorImageStyle?: ImageStyle;
  cardImageStyle?: ImageStyle;
}) {
  return (
    <View style={[styles.creatorContainer, style]}>
      <Image
        source={
          league.creator.pic.url
            ? { uri: league.creator.pic.url }
            : Images.EAGLE
        }
        style={[styles.creatorImage, creatorImageStyle]}
      />
      <View style={[styles.cardGroupRight, cardGroupRight]}>
        <View style={[styles.card1, { transform: [{ rotate: '-157.66deg' }] }]}>
          <Image
            style={[styles.cardImage, cardImageStyle]}
            source={cardsImages[league.creator.skins.choseSkin || 'default']}
          />
        </View>
        <View
          style={[
            styles.card2,
            { left: 10, transform: [{ rotate: '-146.9deg' }] },
          ]}
        >
          <Image
            style={[styles.cardImage, cardImageStyle]}
            source={cardsImages[league.creator.skins.choseSkin || 'default']}
          />
        </View>
      </View>
      <View style={[styles.cardGroupLeft, cardGroupLeft]}>
        <View style={[styles.card1, { transform: [{ rotate: '157.66deg' }] }]}>
          <Image
            style={[styles.cardImage, cardImageStyle]}
            source={cardsImages[league.creator.skins.choseSkin || 'default']}
          />
        </View>
        <View
          style={[
            styles.card2,
            { left: -10, transform: [{ rotate: '146.9deg' }] },
          ]}
        >
          <Image
            style={[styles.cardImage, cardImageStyle]}
            source={cardsImages[league.creator.skins.choseSkin || 'default']}
          />
        </View>
      </View>
      <View style={styles.creatorNameContainer}>
        <Text style={styles.creatorNameText}>{league.creator.name}</Text>
        <SvgXml
          style={styles.crownIcon}
          width={20}
          height={20}
          xml={icons[0].crown}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  creatorImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
    zIndex: 2,
  },
  cardGroupRight: {
    position: 'absolute',
    top: 10,
    left: '80%',
    transform: [{ translateX: -35 }],
    width: 70,
    height: 70,
  },
  card1: {
    width: 32,
    height: 46,
    position: 'absolute',
    boxShadow: '-1.63px 0px 2.4px 0px rgba(0, 0, 0, 0.37)',
    zIndex: 1,
  },
  cardGroupLeft: {
    position: 'absolute',
    top: 10,
    left: '20%',
    width: 70,
    height: 70,
  },
  card2: {
    width: 32,
    height: 45,
    position: 'absolute',
    top: 10,
    boxShadow: '-1.63px 0px 2.4px 0px rgba(0, 0, 0, 0.37)',
  },
  creatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '15%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 1.57,
  },
  crownIcon: {
    shadowColor: '#F3C91D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4.39,
    elevation: 10,
  },
  creatorNameContainer: {
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    boxShadow: '0px 5.08px 6.6px 0px rgba(0, 0, 0, 0.25)',
  },
  creatorNameText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiRegular,
    fontSize: 12,
  },
});
