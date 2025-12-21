import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import changeLevelsToAR from '../../utils/changeLevelsToAR';
import { Image } from 'react-native';
import { Colors, fonts, Images, Display } from '@abdlarahman/shared';
import { icons } from '../chat/icons';
import { UserCard } from './UserCard';
import { BlurView } from 'expo-blur';

export default function HeaderProfileCard({
  user,
  isMini,
  imgFun,
}: {
  user: UserCard;
  isMini?: boolean;
  imgFun?: () => void;
}) {
  return (
    <BlurView
      intensity={isMini ? 0 : 9.7}
      style={isMini ? styles.innerContainer : styles.innerContainerFull}
    >
      <View style={styles.centeredContainer}>
        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>{user.name}</Text>
        </View>
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userStatsContainer}>
          <View style={styles.statItem}>
            <SvgXml style={styles.statIcon} xml={icons[0].whiteSTART} />
            <Text style={styles.statText}>{user.level.totalGamePoints}</Text>
          </View>
          <View style={styles.statItem}>
            <SvgXml style={styles.statIcon} xml={icons[0].orngeStart} />
            <Text style={styles.statText}>{user.leagueNum}</Text>
          </View>
        </View>
        <View style={styles.userImageContainer}>
          <TouchableOpacity disabled={!imgFun} onPress={imgFun}>
            <Image
              style={styles.userImage}
              source={
                user.pic && user.pic.url ? { uri: user.pic.url } : Images.EAGLE
              }
            />
          </TouchableOpacity>
          <View style={styles.userLevelContainer}>
            <Text style={styles.userLevelText}>
              {changeLevelsToAR(user.level.name)}
            </Text>
          </View>
        </View>
        <View style={styles.userStatsContainer}>
          <View style={styles.statItem}>
            <SvgXml style={styles.statIcon} xml={icons[0].emptyh} />
            <Text style={styles.statText}>{user.likesNum}</Text>
          </View>
          <View style={styles.statItem}>
            <SvgXml style={styles.statIcon} xml={icons[0].class} />
            <Text style={styles.statText}>{user.achievementsNum}</Text>
          </View>
        </View>
      </View>
    </BlurView>
  );
}
const commonStyles = StyleSheet.create({
  shadow: {
    // boxShadow: '0px 4px 5.2px 0px rgba(0, 0, 0, 0.25)',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6.59,
    flexDirection: 'row-reverse',
  },
});
const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    paddingHorizontal: 19.5,
    paddingBottom: 20,
  },
  innerContainerFull: {
    width: '100%',
    paddingHorizontal: Display.setWidth(10),
    paddingBottom: 20,
    backgroundColor: 'rgba(38, 43, 51, 0.4)',
    borderRadius: 16,
    boxShadow: '0px 4px 36.6px 0px rgba(0, 0, 0, 0.25)',
  },
  centeredContainer: {
    width: '100%',
    ...commonStyles.centered,
    alignSelf: 'center',
  },
  userNameContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    backgroundColor: Colors.BACKGROUND_3,
    boxShadow: `0px 4px 4px 0px rgba(0, 0, 0, 0.25)`,
    minWidth: 75,
    ...commonStyles.centered,
    alignSelf: 'center',
  },
  userNameText: {
    fontFamily: fonts.almaraiBold,
    color: Colors.DEFAULT_WHITE,
    fontSize: 8,
  },
  userInfoContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  userStatsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 30,
  },
  statItem: {
    flexDirection: 'row-reverse',
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 12,
    gap: 4,
    width: 70,
    alignItems: 'center',
    paddingRight: 5,
    height: Display.setWidth(5),
    boxShadow: `0px 4px 5.2px 0px ${Colors.SHADOW}`,
  },
  statText: {
    fontFamily: fonts.almaraiRegular,
    color: Colors.DEFAULT_WHITE,
    fontSize: 10,
    marginBottom: 1,
  },
  statIcon: {
    shadowColor: Colors.PRIMARY_50,
    ...commonStyles.shadow,
  },
  userImageContainer: {
    position: 'relative',
    bottom: '-2%',
    ...commonStyles.centered,
  },
  userImage: {
    width: 93,
    height: 93,
    borderRadius: 2000,
  },
  userLevelContainer: {
    width: 100,
    height: 21.46,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 5.72,
    top: -10,
    boxShadow: `0px 5.72px 7.44px 0px ${Colors.SHADOW}`,
    ...commonStyles.centered,
  },
  userLevelText: {
    fontFamily: fonts.almaraiBold,
    color: Colors.DEFAULT_WHITE,
    fontSize: 8,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
  },
});
