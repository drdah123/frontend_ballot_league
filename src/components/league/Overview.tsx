import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { User } from 'iconsax-react-native';
import { SvgXml } from 'react-native-svg';
import {
  fonts,
  Colors,
  LinearButton2,
  Mix,
  changeLevelsToAR,
  Display,
  AvatarWith4Cards,
  sharedIcons,
} from '@abdlarahman/ui-components';
import GradientText from './GradientText ';
import { LeagueType } from '../../types/league';

const { setWidth } = Display;

export default function Overview({
  league,
  selectedTab,
}: {
  league: LeagueType;
  selectedTab: 'overview' | 'plan' | 'chat';
}) {
  return (
    <View
      style={[
        styles.viewContainer,
        {
          display: selectedTab === 'overview' ? 'flex' : 'none',
        },
      ]}
    >
      <View
        style={{
          paddingHorizontal: setWidth(4),
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <View style={styl.columContainer2}>
          <View style={styl.rowContainer3}>
            <View style={styl.raduceContainer1}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.almaraiBold,
                  fontSize: 14,
                }}
              >
                {Number(league.startTime) <= Date.now()
                  ? 'نشط الآن'
                  : 'قريباً نشط'}
              </Text>
            </View>
            <View
              style={{
                width: 50,
              }}
            >
              <GradientText
                text={league.name}
                style={{
                  fontSize: 15,
                  fontFamily: fonts.almaraiBold,
                  textAlign: 'center',
                  flexWrap: 'wrap',
                }}
              />
            </View>
            {league.type === 'qeed' ? (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: fonts.almaraiRegular,
                    color: 'white',
                  }}
                >
                  45
                </Text>
                <SvgXml xml={svgs.trophySmall} />
              </>
            ) : (
              <AvatarWith4Cards
                league={league}
                style={{
                  position: 'absolute',
                  top: -80,
                  right: 0,
                  left: 0,
                }}
                cardGroupRight={{
                  left: '65%',
                  top: '30%',
                }}
                cardGroupLeft={{
                  left: '40%',
                  top: '25%',
                }}
                creatorImageStyle={{
                  width: 95,
                  height: 95,
                  borderRadius: 100,
                }}
                cardImageStyle={{
                  width: 50,
                  height: 65,
                }}
              />
            )}
          </View>
          <View style={styl.complex_row_col}>
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
                backgroundColor: Colors.BACKGROUND_3,
                padding: 8,
                borderRadius: 16,
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {league.type === 'qeed' ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Colors.BACKGROUND_4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 14,
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 10,
                        fontFamily: fonts.almaraiBold,
                      }}
                    >
                      : 9 نقاط دوري
                    </Text>
                    <SvgXml xml={icons[0].bronze} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Colors.BACKGROUND_4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 14,
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 10,
                        fontFamily: fonts.almaraiBold,
                      }}
                    >
                      : 4 نقاط دوري
                    </Text>
                    <SvgXml xml={icons[0].silver} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: Colors.BACKGROUND_4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 14,
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 10,
                        fontFamily: fonts.almaraiBold,
                      }}
                    >
                      : 2 نقاط دوري
                    </Text>
                    <SvgXml xml={icons[0].gold} />
                  </View>
                </>
              ) : (
                <>
                  {league.prizes.secondWinnerPrize ? (
                    <View
                      style={{
                        alignItems: 'center',
                        backgroundColor: Colors.BACKGROUND_4,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 14,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <SvgXml xml={icons[0].diamond2} />
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: fonts.almaraiBold,
                          fontSize: 12,
                          marginRight: 1,
                        }}
                      >
                        {league.prizes.secondWinnerPrize}
                      </Text>
                      <SvgXml xml={icons[0].second} />
                    </View>
                  ) : null}
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: Colors.BACKGROUND_4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 14,
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <SvgXml xml={icons[0].diamond2} />
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: fonts.almaraiBold,
                        fontSize: 12,
                        marginRight: 1,
                      }}
                    >
                      {league.prizes.winnerPrize}
                    </Text>
                    <SvgXml xml={icons[0].first} />
                  </View>
                </>
              )}
            </View>
          </View>
          <View
            style={{
              ...styl.rowContainer3,
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <View style={styl.textContainer}>
              <SvgXml
                xml={
                  league.playType === 'free'
                    ? sharedIcons.free_play
                    : sharedIcons.limited_play
                }
              />
            </View>
            <View style={styl.textContainer}>
              <SvgXml
                xml={
                  league.playSpeed === 'fast'
                    ? sharedIcons.play_speed_10
                    : league.playSpeed === 'slow'
                    ? sharedIcons.play_speed_60
                    : sharedIcons.play_speed_30
                }
              />
            </View>
            <View style={styl.textContainer}>
              <SvgXml
                xml={
                  league.roundType === 'all_3'
                    ? sharedIcons.coffee_3
                    : sharedIcons.coffee_1
                }
              />
            </View>
            <View style={styl.textContainer}>
              <SvgXml
                xml={sharedIcons[`chair_${league.maxSeats}`]}
                width={24}
                height={24}
              />
            </View>
          </View>

          <View style={{ ...styl.rowContainer2, gap: 8 }}>
            <View
              style={{
                ...styl.raduceContainer1,
                borderRadius: 8,
                paddingHorizontal: 10,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SvgXml xml={icons[0].chear} />
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.almaraiRegular,
                  fontSize: 12,
                }}
              >
                المقاعد: {league.maxSeats || '32'}
              </Text>
            </View>
            <View
              style={{
                ...styl.raduceContainer1,
                borderRadius: 8,
                paddingHorizontal: 8,
                gap: 4,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: fonts.almaraiBold,
                  fontSize: 12,
                }}
              >
                المطلوب:
              </Text>
              <LinearButton2
                text={changeLevelsToAR(league.levelName)}
                textStyles={{
                  fontSize: 12,
                  fontFamily: fonts.almaraiBold,
                  color: Colors.BACKGROUND_3,
                }}
                onPress={() => {}}
                containerStyle={{
                  width: 40,
                  height: 0,
                  marginTop: 4,
                  borderRadius: 4,
                }}
                linearStyle={{
                  width: 40,
                  height: 20,
                  paddingVertical: 0,
                  borderRadius: 4,
                  marginTop: 6,
                }}
              />
            </View>
            <View
              style={{
                ...styl.raduceContainer1,
                borderRadius: 8,
                paddingHorizontal: 10,
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <User size="16" color={`${Colors.SECONDARY_600}`} />
              <Text
                style={{
                  color: '#FFFF',
                  fontFamily: fonts.almaraiRegular,
                  fontSize: 12,
                }}
              >
                المسجلين:{league.participantsNumber || '0'}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              backgroundColor: Colors.BACKGROUND_3,
            }}
          >
            <Text
              style={{
                color: '#939599',
                fontFamily: fonts.almaraiRegular,
                fontSize: 8,
              }}
            >
              انتهى التسجيل والدوري نشط الآن!
            </Text>
            <Text
              style={{
                color: '#939599',
                fontFamily: fonts.almaraiRegular,
                fontSize: 8,
                marginTop: 8,
              }}
            >
              يمكنك متابعة تقدم الدوري في صفحة المخطط
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              marginTop: 12,
              width: '100%',
              flexDirection: 'row-reverse',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {league.spectators && league.spectators.length > 0
              ? league.spectators.map((spectator, index) => (
                  <Mix user={spectator} key={spectator._id + index} />
                ))
              : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styl = StyleSheet.create({
  columContainer2: {
    padding: 8,
    gap: 4,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 16,
    marginTop: 70,
  },
  raduceContainer1: {
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_3,
    padding: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  rowContainer3: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
  complex_row_col: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.BACKGROUND_3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer2: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
});
