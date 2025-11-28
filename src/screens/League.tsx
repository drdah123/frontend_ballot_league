import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { ArrowRight2, SearchNormal1 } from 'iconsax-react-native';
import { SvgXml } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import IMPORTS from '../../repeated_items/index';
import Overview from '../components/league/Overview';
import Plan from '../components/league/Plan';
import GradientText from '../components/league/GradientText ';
import {
  router,
  Stack,
  useLocalSearchParams,
  useFocusEffect,
} from 'expo-router';
import { LeagueType, LeaveLeagueResponse } from '../types/league';
import Chat from '../components/league/Chat';
import { useMutation } from '@apollo/client';
import { LEAVE_LEAGUE } from '../schema/league';
import { useToast } from 'react-native-toast-notifications';

const { useOnlineContext } = IMPORTS.ONLINE_CONTEXT;
const { icons } = IMPORTS.CHAT_ICONS;
const Colors = IMPORTS.COLORS;
const fonts = IMPORTS.FONTS;
const { commonStyles } = IMPORTS.COMMON_STYLES;
const styles = IMPORTS.CHAT_STYLES;
const { svgs } = IMPORTS.FRIENDS_SVG;
const Images = IMPORTS.IMAGES;

export default function League() {
  const params = useLocalSearchParams();
  const { league, setLeague, setLeagueChat } = useOnlineContext();
  const toast = useToast();
  const [leaveLeague] = useMutation<
    LeaveLeagueResponse,
    {
      leagueId: string;
    }
  >(LEAVE_LEAGUE);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'plan' | 'chat'>(
    'overview'
  );

  useFocusEffect(
    useCallback(() => {
      // This runs when the screen comes into focus
      if (params.league && league === null) {
        const leagueData: LeagueType = JSON.parse(params.league as string);
        setLeague(leagueData);
      }
      return () => {
        // This runs when the screen goes out of focus
        leaveLeagueHandle();
        setLeague(null);
        setLeagueChat(null);
      };
    }, [])
  );

  // Early returns after all hooks
  if (!params) return router.back();
  if (!league) return null;
  async function leaveLeagueHandle() {
    const league = JSON.parse(params.league as string);
    if (!league?._id) return;

    try {
      const { data } = await leaveLeague({
        variables: {
          leagueId: league._id,
        },
      });
      if (data?.leaveLeague.success) console.log('Left league successfully');
    } catch (error) {
      console.error('Error logging out of league:', error);
      toast.show('Error logging out of league', { type: 'danger' });
    }
  }
  function getColoredIcon(xmlString: any, color: any) {
    return (
      xmlString
        // .replace(/fill="[^"]*"/g, `fill="${color}"`)
        .replace(/stroke="[^"]*"/g, `stroke="${color}"`)
    );
  }
  const isSelected = (tab: any) => selectedTab === tab;

  const coloredChatIconXml = getColoredIcon(
    icons[0].chatT,
    isSelected('chat') ? '#FFFFFF' : Colors.BACKGROUND_3
  );
  const coloredPlanIconXml = getColoredIcon(
    icons[0].plan,
    isSelected('plan') ? '#FFFFFF' : Colors.BACKGROUND_3
  );

  return (
    <View style={styles.viewContainer}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ImageBackground
        style={[
          styles.background,
          {
            paddingBottom: 0,
          },
        ]}
        source={Images.BACKGROUND}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.1,
        }}
      >
        <BlurView
          intensity={5}
          tint="dark"
          style={[
            commonStyles.blur.blurContainer,
            {
              paddingTop: 20,
            },
          ]}
        >
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              paddingVertical: 20,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 16,
                paddingVertical: 13,
                gap: 21.25,
              }}
            >
              <View
                style={{
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <GradientText
                  text={league.name}
                  style={{
                    fontSize: 15,
                    fontFamily: fonts.almaraiBold,
                    paddingHorizontal: 8,
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
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: Colors.BACKGROUND_5,
                borderRadius: 16,
                alignItems: 'center',
                padding: 12,
                gap: 4,
                boxShadow: '4px 4px 11.6px 0px rgba(253, 245, 233, 0.1)',
              }}
              onPress={() => router.back()}
            >
              <Text
                style={{
                  color: Colors.BACKGROUND_3,
                  fontFamily: fonts.almaraiRegular,
                }}
              >
                عودة
              </Text>
              <ArrowRight2 size={16} color={Colors.BACKGROUND_3} />
            </TouchableOpacity>
          </View>
        </BlurView>
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            display: selectedTab === 'plan' ? 'flex' : 'none',
          }}
        >
          {/* {league.matches ? (
          <Plan matches={league.matches ?? []} />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>No matches available</Text>
            </View>
          )} */}
        </View>
        {selectedTab === 'plan' ? (
          <Plan
            matches={league.matches || []}
            participantsNumber={league.participantsNumber}
          />
        ) : null}

        <Overview league={league} selectedTab={selectedTab} />
        <Chat leagueId={league._id} selectedTab={selectedTab} />
        <BlurView
          intensity={5}
          tint="dark"
          style={{
            ...commonStyles.blur.blurContainer,
            borderTopEndRadius: selectedTab === 'chat' ? 0 : 24,
            borderTopStartRadius: selectedTab === 'chat' ? 0 : 24,
          }}
        >
          <View
            style={{
              width: '100%',
              padding: 12,
              overflow: 'hidden',
              borderRadius: 24,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.BACKGROUND_5,
                padding: 8,
                borderRadius: 16,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Pressable
                style={{
                  flex: 1,
                }}
                onPress={() => setSelectedTab('plan')}
              >
                <View
                  style={{
                    paddingHorizontal: 28,
                    paddingVertical: 8,
                    backgroundColor: isSelected('plan')
                      ? Colors.PRIMARY_600
                      : Colors.BACKGROUND_4,
                    borderRadius: 16,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <SvgXml xml={coloredPlanIconXml} />
                  <Text
                    style={{
                      color: isSelected('plan')
                        ? '#FFFFFF'
                        : Colors.BACKGROUND_3,
                      fontSize: 14,
                      fontFamily: fonts.almaraiRegular,
                      marginTop: 4,
                    }}
                  >
                    المخطط
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={{
                  flex: 1,
                }}
                onPress={() => setSelectedTab('overview')}
              >
                <View
                  style={{
                    paddingHorizontal: 28,
                    paddingVertical: 8,
                    backgroundColor: isSelected('overview')
                      ? Colors.PRIMARY_600
                      : Colors.BACKGROUND_4,
                    borderRadius: 16,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <SearchNormal1
                    size="24"
                    color={
                      isSelected('overview') ? '#FFFFFF' : Colors.BACKGROUND_3
                    }
                  />
                  <Text
                    style={{
                      color: isSelected('overview')
                        ? '#FFFFFF'
                        : Colors.BACKGROUND_3,
                      fontSize: 14,
                      fontFamily: fonts.almaraiRegular,
                      marginTop: 4,
                    }}
                  >
                    نظرة عامة
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={{
                  flex: 1,
                }}
                onPress={() => setSelectedTab('chat')}
              >
                <View
                  style={{
                    paddingHorizontal: 28,
                    paddingVertical: 8,
                    backgroundColor: isSelected('chat')
                      ? Colors.PRIMARY_600
                      : Colors.BACKGROUND_4,
                    borderRadius: 16,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <SvgXml xml={coloredChatIconXml} />
                  <Text
                    style={{
                      color: isSelected('chat')
                        ? '#FFFFFF'
                        : Colors.BACKGROUND_3,
                      fontSize: 14,
                      fontFamily: fonts.almaraiRegular,
                      marginTop: 4,
                    }}
                  >
                    دردشة
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const shadow = StyleSheet.create({
  // inside shadow
  container: {
    padding: 16,
    backgroundColor: Colors.NEUTRALS,
    borderRadius: 8,
    boxShadow: '4px 4px 6.8px 0px #0000004D',
  },
  text: {
    color: Colors.PRIMARY_600,
    fontFamily: fonts.almaraiRegular,
  },
  blurContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  blurContainer2: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
