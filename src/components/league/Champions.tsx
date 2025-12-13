import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  fonts,
  Colors,
  LinearButton2,
  Display,
  getGraphQLErrors,
  friendsSvgs,
  chatIcons,
} from '@abdlarahman/shared';

type LeagueTypeType = any;
const svgs = friendsSvgs;
const icons = chatIcons;
import LeagueItem from './LeagueItem';
import {
  GET_LEAGUES,
  JOIN_LEAGUE,
  REGISTER_IN_LEAGUE,
} from '../../schema/league';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { useFocusEffect, useRouter } from 'expo-router';
import { LeagueType } from '../../types/league';
import { MessageWithSuccess } from '../../types/ApiTypes';
import CreateLeagueButton from './CreateLeagueButton';
import { useCallback } from 'react';
import { ToastType } from 'react-native-toast-notifications';

type LeagueData = {
  getLeagues: LeagueType[];
};
type RegisterInLeagueVariables = {
  leagueId: string;
  password?: string;
};
export default function Champions({
  type,
  toast,
  useGeneralContext,
}: {
  type: LeagueTypeType['value'];
  toast?: ToastType;
  useGeneralContext: () => {
    isConnectedToTabs: boolean;
    setIsConnectedToTabs: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) {
  const { data } = useQuery<LeagueData, { type: LeagueTypeType['value'] }>(
    GET_LEAGUES,
    {
      variables: {
        type,
      },
      fetchPolicy: 'cache-and-network',
      onError: (error) => {
        console.error('Error fetching leagues:', error);
      },
    }
  );
  const router = useRouter();
  const [joinLeague, { loading }] = useMutation<
    {
      joinLeague: LeagueType;
    },
    {
      leagueId: string;
    }
  >(JOIN_LEAGUE, {
    onError(error) {
      getGraphQLErrors(error, 'JOIN_LEAGUE');
    },
  });

  const { setIsConnectedToTabs } = useGeneralContext();

  const [registerInLeague, { loading: registerLoading }] = useMutation<
    {
      registerInLeague: MessageWithSuccess;
    },
    RegisterInLeagueVariables
  >(REGISTER_IN_LEAGUE);
  const client = useApolloClient();
  async function joinLeagueHandler(leagueId: string) {
    try {
      const { data } = await joinLeague({
        variables: {
          leagueId,
        },
      });
      if (data?.joinLeague) {
        router.push({
          pathname: 'League',
          params: {
            league: JSON.stringify(data.joinLeague),
          },
        });
      }
    } catch (error) {
      toast?.show('خطأ في الانضمام إلى الدوري', {
        type: 'danger',
      });
      console.error('Error joining league:', error);
    }
  }
  async function registerInLeagueHandler(leagueId: string, password?: string) {
    try {
      if (loading || registerLoading || !data) return;
      const variables: RegisterInLeagueVariables = {
        leagueId,
      };
      if (password) variables.password = password;

      const { data: registerResponse } = await registerInLeague({
        variables,
      });
      if (registerResponse?.registerInLeague.success) {
        console.log('League registered:', registerResponse.registerInLeague);
        client.writeQuery({
          query: GET_LEAGUES,
          variables: {
            type,
          },
          data: {
            getLeagues: data.getLeagues.map((league) =>
              league._id === leagueId
                ? { ...league, isRegistered: true }
                : league
            ),
          },
        });
      }
    } catch (error) {
      console.error('Error registering in league:', error);
    }
  }
  useFocusEffect(
    useCallback(() => {
      setIsConnectedToTabs(true);
      return () => {
        setIsConnectedToTabs(false);
      };
    }, [])
  );
  if (type !== 'public' && type !== 'qeed') return null;
  return (
    <>
      <ScrollView style={{ ...styles.viewContainer }}>
        <View style={styles.viewContainer}>
          {/* <View style={styles.tabContainer}>
          <Text style={styles.dateText}>تبدأ البطولات بتاريخ 28/9/2024</Text>
          <SvgXml xml={icons[0].date} />
        </View>
        <LeagueItemWillCome /> */}
          <View style={styles.tabContainer2}>
            <Text style={styles.dateText}>الدوريات النشطة (1)</Text>
          </View>
          {data && data.getLeagues.length > 0
            ? data.getLeagues.map((league, i) => (
                <LeagueItem
                  key={league._id}
                  league={league}
                  type={type}
                  isAd={league.isAd}
                  registerInLeagueHandler={registerInLeagueHandler}
                  joinLeagueHandler={joinLeagueHandler}
                  startTime={league.startTime}
                />
              ))
            : null}
        </View>
      </ScrollView>
      <CreateLeagueButton type="public" />
    </>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingBottom: Display.setHeight(21),
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    fontFamily: fonts.almaraiBold,
    margin: 8,
  },
  tabContainer: {
    width: '100%',
    backgroundColor: Colors.BACKGROUND_3,
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 8,
    marginTop: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabContainer2: {
    width: '100%',
    backgroundColor: Colors.BACKGROUND_3,
    paddingVertical: 2,
    zIndex: 8,
    marginTop: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  champions: {
    backgroundColor: Colors.BACKGROUND_4,
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginTop: 8,
    gap: 4,
    borderRadius: 16,
    padding: 8,
    position: 'relative',
    width: '45%',
  },
  championRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  championsTextN: {
    fontSize: 20,
    fontFamily: fonts.almaraiRegular,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row-reverse',
    gap: 4,
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

function LeagueItemWillCome() {
  return (
    <View style={styles.champions}>
      <View style={styles.championRow}>
        <SvgXml xml={svgs.champions} />

        <Text style={styles.championsTextN}>45</Text>
        <SvgXml xml={svgs.trophySmall} />
      </View>

      <View style={styles.rowContainer}>
        <View style={{ flexDirection: 'column', gap: 16 }}>
          <Text
            style={{
              color: '#D4D5D6',
              fontSize: 12,
              fontFamily: fonts.almaraiRegular,
            }}
          >
            الجوائز
          </Text>
          <SvgXml xml={icons[0].start} />
        </View>
        <View
          style={{
            flexDirection: 'column-reverse',
            gap: 4,
            backgroundColor: Colors.BACKGROUND_3,
            padding: 8,
            borderRadius: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        </View>
      </View>
      <View style={{ ...styles.rowContainer, marginTop: 4 }}>
        <Text
          style={{
            color: '#D4D5D6',
            fontSize: 12,
            fontFamily: fonts.almaraiRegular,
          }}
        >
          الموعد
        </Text>
        <View
          style={{
            flexDirection: 'row-reverse',
            backgroundColor: Colors.BACKGROUND_3,
            padding: 8,
            gap: 8,
            alignItems: 'center',
            borderRadius: 16,
          }}
        >
          <SvgXml xml={icons[0].clock} />
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: fonts.almaraiBold,
            }}
          >
            00:06:14
          </Text>
        </View>
      </View>
      <View style={{ ...styles.rowContainer2, marginTop: 4 }}>
        <LinearButton2
          text="متقدم"
          textStyles={{
            fontSize: 13,
            fontFamily: fonts.almaraiBold,
            color: Colors.BACKGROUND_3,
          }}
          onPress={() => {}}
          containerStyle={{
            width: 50,
            height: 26,
          }}
          linearStyle={{
            width: 55,
            height: 26,
            paddingVertical: 0,
          }}
        />
        <View style={styles.iconsContainer}>
          <SvgXml xml={icons[0].diampond} />
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: fonts.almaraiBold,
            }}
          >
            200
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <SvgXml xml={icons[0].chear} />
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: fonts.almaraiBold,
            }}
          >
            200
          </Text>
        </View>
      </View>
    </View>
  );
}
