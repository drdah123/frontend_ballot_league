import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  SvgXml,
  Svg,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import IMPORTS from '../../../repeated_items/index';

import React, { useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
// @ts-ignore
import Countdown from 'react-native-countdown-timer-hooks';
import { LeagueType } from '../../types/league';
import { LeagueTypeType } from '@/repeated_items/types/Leagues';

const LinearButton2 = IMPORTS.LINEAR_BUTTON_2;
const fonts = IMPORTS.FONTS;
const Colors = IMPORTS.COLORS;
const { icons } = IMPORTS.CHAT_ICONS;
const LeagueIcons = IMPORTS.LEAGUE_ICONS;
const sharedIcons = IMPORTS.SHARED_ICONS;
const backgroundsImages = IMPORTS.BACKGROUNDS_IMAGES;
const { setWidth, setHeight } = IMPORTS.DISPLAY;
const Images = IMPORTS.IMAGES;
const cardsImages = IMPORTS.CARDS_IMAGES;
const changeLeagueRound = IMPORTS.CHANGE_LEAGUE_ROUND;

export default function LeagueItem({
  type,
  league,
  joinLeagueHandler,
  registerInLeagueHandler,
  startTime,
  isAd,
}: {
  type: LeagueTypeType['value'];
  league: LeagueType;
  isAd: boolean;
  registerInLeagueHandler(leagueId: string, password?: string): Promise<void>;
  joinLeagueHandler(leagueId: string): Promise<void>;
  startTime: string | number;
}) {
  const [isEligible, setIsEligible] = React.useState(true);
  startTime = Number(startTime);
  const now = Date.now();
  const stillTime = useMemo(() => (startTime - now) / 1000, [startTime]); // Convert to seconds
  const isActive = startTime < now;

  if (type == 'public')
    return (
      <View>
        <LeagueItemContainer isAd={isAd}>
          <View style={styles.rowContainer3}>
            <View
              style={[styles.raduceContainer1, styles.eligibilityContainer]}
            >
              <Text
                style={[
                  styles.eligibilityText,
                  { color: isEligible ? Colors.SUCCESS_500 : '#D4D5D6' },
                ]}
              >
                {isEligible ? 'مؤهل' : 'غير مؤهل'}
              </Text>
              <View style={styles.buttonContainer}>
                <LinearButton2
                  text="متقدم"
                  colors={['#FFFCA8', '#FDB836', '#FDC966', '#F1DC83']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  locations={[0, 0.312, 0.7592, 1]}
                  textStyles={{
                    color: Colors.DEFAULT_BLACK,
                    fontFamily: fonts.almaraiRegular,
                    fontSize: 9,
                  }}
                  onPress={() => {}}
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0,
                  }}
                  linearStyle={{
                    width: '100%',
                    height: '100%',
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    borderRadius: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 0,
                  }}
                />
              </View>
            </View>
            <View
              style={[styles.raduceContainer1, styles.participantsContainer]}
            >
              <View style={styles.participantsInner}>
                <Text style={styles.participantsText}>
                  عدد المشاركين: {league.participantsNumber}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.topIcon}>
            <Image
              source={backgroundsImages.default}
              style={styles.topIconImage}
            />
          </View>
          <View style={styles.columContainer2}>
            <View style={styles.complex_row}>
              <View style={styles.featuresColumn}>
                <View style={styles.featuresInner}>
                  <Text style={styles.featuresTitle}>الخصائص</Text>
                  <View style={styles.featuresGrid}>
                    <View style={styles.featuresRow}>
                      <SvgXml
                        xml={sharedIcons.chair_16}
                        width={30}
                        height={30}
                      />
                      <SvgXml
                        xml={sharedIcons.coffee_1}
                        width={30}
                        height={30}
                      />
                    </View>
                    <View style={styles.featuresRow}>
                      <SvgXml
                        xml={sharedIcons.free_play}
                        width={30}
                        height={30}
                      />
                      <SvgXml
                        xml={sharedIcons.play_speed_10}
                        width={30}
                        height={30}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.centerColumn}>
                {/*//! need to edit */}

                {/* Gradient-filled text using SVG */}
                <Svg width="100%" height={20}>
                  <Defs>
                    <SvgGradient
                      id="textGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <Stop offset="0.05%" stopColor="#FFFCA8" />
                      <Stop offset="31.2%" stopColor="#FDB836" />
                      <Stop offset="75.92%" stopColor="#FDC966" />
                      <Stop offset="100.02%" stopColor="#F1DC83" />
                    </SvgGradient>
                  </Defs>
                  <SvgText
                    fill="url(#textGradient)"
                    fontSize={14}
                    fontFamily={fonts.almaraiRegular}
                    x="50%"
                    y="15"
                    textAnchor="middle"
                  >
                    {league.name}
                  </SvgText>
                </Svg>
                {league.isAd ? (
                  <View style={styles.adImageContainer}>
                    <Image
                      source={league.img ? { uri: league.img } : Images.EAGLE}
                      style={styles.adImage}
                    />
                  </View>
                ) : (
                  <View style={styles.creatorContainer}>
                    <Image
                      source={
                        league.creator.pic.url
                          ? { uri: league.creator.pic.url }
                          : Images.EAGLE
                      }
                      style={styles.creatorImage}
                    />
                    <View style={styles.cardGroupRight}>
                      <View
                        style={[
                          styles.card1,
                          { transform: [{ rotate: '-157.66deg' }] },
                        ]}
                      >
                        <Image
                          style={styles.cardImage}
                          source={
                            cardsImages[
                              league.creator.skins.choseSkin || 'default'
                            ]
                          }
                        />
                      </View>
                      <View
                        style={[
                          styles.card2,
                          { left: 10, transform: [{ rotate: '-146.9deg' }] },
                        ]}
                      >
                        <Image
                          style={styles.cardImage}
                          source={
                            cardsImages[
                              league.creator.skins.choseSkin || 'default'
                            ]
                          }
                        />
                      </View>
                    </View>
                    <View style={styles.cardGroupLeft}>
                      <View
                        style={[
                          styles.card1,
                          { transform: [{ rotate: '157.66deg' }] },
                        ]}
                      >
                        <Image
                          style={styles.cardImage}
                          source={
                            cardsImages[
                              league.creator.skins.choseSkin || 'default'
                            ]
                          }
                        />
                      </View>
                      <View
                        style={[
                          styles.card2,
                          { left: -10, transform: [{ rotate: '146.9deg' }] },
                        ]}
                      >
                        <Image
                          style={styles.cardImage}
                          source={
                            cardsImages[
                              league.creator.skins.choseSkin || 'default'
                            ]
                          }
                        />
                      </View>
                    </View>
                    <View style={styles.creatorNameContainer}>
                      <Text style={styles.creatorNameText}>
                        {league.creator.name}
                      </Text>
                      <SvgXml
                        style={styles.crownIcon}
                        width={20}
                        height={20}
                        xml={icons[0].crown}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.prizeColumn}>
                <View style={styles.prizeInner}>
                  <Text style={styles.prizeText}>الجائزة</Text>
                  <SvgXml xml={LeagueIcons.CUP} width={100} height={100} />
                </View>
              </View>
            </View>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor:
                      league.isRegistered || isActive
                        ? Colors.BACKGROUND_5
                        : Colors.PRIMARY_600,
                  },
                ]}
                disabled={league.isRegistered || isActive}
                onPress={() => registerInLeagueHandler(league._id)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        league.isRegistered || isActive
                          ? Colors.BACKGROUND_3
                          : Colors.DEFAULT_WHITE,
                    },
                  ]}
                >
                  {isActive
                    ? changeLeagueRound(league.currentRound)
                    : league.isRegistered
                    ? 'مشارك'
                    : 'شارك'}
                </Text>
              </TouchableOpacity>
              <View style={styles.timeContainer}>
                {isActive ? (
                  <Text style={styles.activeText}>نشط الآن</Text>
                ) : (
                  <>
                    {/* // ! need to test */}
                    <Countdown timestamp={stillTime.toFixed(0)} />
                    <SvgXml xml={LeagueIcons.time} />
                  </>
                )}
              </View>
              <TouchableOpacity
                style={[styles.actionButton, styles.enterButton]}
                onPress={() => joinLeagueHandler(league._id)}
              >
                <Text style={[styles.buttonText, styles.enterButtonText]}>
                  دخول
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LeagueItemContainer>
      </View>
    );
}

function LeagueItemContainer({
  children,
  isAd,
}: {
  children: React.ReactNode;
  isAd: boolean;
}) {
  if (isAd)
    return (
      <>
        <LinearGradient
          colors={['#FFFCA8', '#FDB836', '#FDC966', '#F1DC83']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.312, 0.7592, 1]}
          style={styles.overlayBackground}
        />
        <View style={styles.container}>{children}</View>
      </>
    );
  return (
    <>
      <BlurView
        intensity={50}
        experimentalBlurMethod="dimezisBlurView"
        tint="dark"
        style={styles.overlayBackground}
      />
      <View style={styles.container}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: '100%',
    flexDirection: 'column',
    borderRadius: 16,
    marginTop: setWidth(11.5),
    zIndex: 1,
  },
  overlayBackground: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  eligibilityContainer: {
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_BLACK,
  },
  eligibilityText: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 10,
    alignSelf: 'center',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  buttonContainer: {
    width: 30,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantsContainer: {
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  participantsInner: {
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantsText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiLight,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  topIcon: {
    position: 'absolute',
    top: -20,
    left: setWidth(50) - setWidth(25) / 2,
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 12,
    padding: 6,
    width: setWidth(25),
    height: setWidth(25),
    transform: [{ rotate: '36deg' }],
    borderWidth: 1,
    borderColor: Colors.PRIMARY_600,
  },
  topIconImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 8,
  },
  featuresColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 12,
    padding: 8,
    flex: 1,
    paddingVertical: 15,
  },
  featuresInner: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 24,
  },
  featuresTitle: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiLight,
    fontSize: 14,
    letterSpacing: 0.5,
    verticalAlign: 'middle',
  },
  featuresGrid: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 10,
  },
  centerColumn: {
    padding: 8,
    borderRadius: 16,
    justifyContent: 'flex-start',
    flex: 1.5,
    height: '100%',
    width: '100%',
  },
  adImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '5%',
  },
  adImage: {
    width: 80,
    height: 100,
    zIndex: 2,
    resizeMode: 'center',
  },
  creatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '15%',
  },
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
  cardGroupLeft: {
    position: 'absolute',
    top: 10,
    left: '20%',
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
  card2: {
    width: 32,
    height: 45,
    position: 'absolute',
    top: 10,
    boxShadow: '-1.63px 0px 2.4px 0px rgba(0, 0, 0, 0.37)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 1.57,
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
  crownIcon: {
    shadowColor: '#F3C91D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4.39,
    elevation: 10,
  },
  prizeColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 12,
    height: '100%',
    paddingHorizontal: 4,
    flex: 1,
  },
  prizeInner: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  prizeText: {
    color: '#D4D5D6',
    fontSize: 16,
    fontFamily: fonts.almaraiLight,
    letterSpacing: 0.5,
  },
  buttonsRow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  timeContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND_3,
    paddingVertical: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  activeText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiRegular,
    fontSize: 14,
  },
  buttonText: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 14,
  },
  enterButton: {
    backgroundColor: Colors.BACKGROUND_5,
  },
  enterButtonText: {
    color: Colors.PRIMARY_500,
  },
  columContainer2: {
    padding: 8,
    gap: 4,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 16,
    marginTop: 8,
  },
  rowContainer3: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    zIndex: -1,
  },
  raduceContainer1: {
    borderRadius: 8,
    backgroundColor: Colors.BACKGROUND_3,
    padding: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  championsTextN: {
    fontSize: 20,
    fontFamily: fonts.almaraiRegular,
    color: Colors.DEFAULT_WHITE,
  },
  textContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  textColers: {
    fontFamily: fonts.almaraiBold,
    fontSize: 8,
  },
  complex_row: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer2: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    gap: 4,
  },
});
