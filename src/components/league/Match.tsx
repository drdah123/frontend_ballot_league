import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Eye } from 'iconsax-react-native';
import IMPORTS from '../../../repeated_items/index';
import { ApiMatch } from '../../types/league';

const Colors = IMPORTS.COLORS;
const fonts = IMPORTS.FONTS;
const Images = IMPORTS.IMAGES;

interface DynamicComponentProps {
  scenario: 1 | 2 | 3;
  match: string;
  matchData: ApiMatch;
}

function Match({ scenario, match, matchData }: DynamicComponentProps) {
  const endText = useMemo(
    () => (scenario === 1 ? 'انتهت' : scenario === 2 ? 'شاهد' : 'ستبدأ قريباً'),
    [scenario]
  );
  const endTextColor = useMemo(
    () =>
      scenario === 1 ? 'white' : scenario === 2 ? Colors.PRIMARY_600 : 'white',
    [scenario]
  );
  const scoreLeft = useMemo(
    () =>
      scenario === 3
        ? 0
        : matchData.roomId && typeof matchData.roomId === 'object'
        ? matchData.roomId.team1.generalResult
        : 0,
    [matchData.roomId]
  );
  const scoreRight = useMemo(
    () =>
      matchData?.roomId && typeof matchData.roomId === 'object'
        ? matchData.roomId.team2.generalResult
        : 0,
    [matchData.roomId]
  );
  const backgroundColor = useMemo(
    () =>
      scenario === 3
        ? Colors.BACKGROUND_4
        : scenario === 2
        ? 'white'
        : Colors.SUCCESS_700,
    [scenario]
  );
  const isLeftWinner = useMemo(() => {
    return {};
  }, []);
  const roundWinners = useMemo(() => {
    if (matchData.round !== 3 || !matchData.roundWinners) return false;
    let left, right;
    matchData.roundWinners.forEach((winner) => {
      if (
        typeof matchData.team1 !== 'object' ||
        typeof matchData.team2 !== 'object'
      )
        return;
      const team1 =
        matchData.team1._id === winner &&
        matchData.team1.players.includes(winner)
          ? 'left'
          : 'right';
      const team2 =
        matchData.team2._id === winner &&
        matchData.team2.players.includes(winner)
          ? 'left'
          : 'right';
    });
    return {
      left: '',
      right: '',
    };
  }, [matchData.roundWinners]);
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Player
          img={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.firstPlayer.realPlayer.pic?.url
              : undefined
          }
          label={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.firstPlayer.realPlayer.name
              : '-'
          }
        />
        <View style={styles.scoreContainer}>
          <Text style={styles.roundText}>{match}</Text>
          <View style={styles.scoreRow}>
            <ScoreBox score={scoreLeft} />
            <ScoreBox score={scoreRight} />
          </View>
        </View>
        <Player
          img={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.thirdPlayer.realPlayer.pic.url
              : undefined
          }
          label={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.thirdPlayer.realPlayer.name
              : '-'
          }
        />
      </View>

      <View style={styles.middleRow}>
        {matchData.round === 3 ? (
          <Circle
            backgroundColor={
              scenario === 2
                ? Colors.BACKGROUND_3
                : scenario !== 3 && isLeftWinner
                ? Colors.SUCCESS_600
                : Colors.BACKGROUND_3
            }
          />
        ) : null}
        <Circle
          backgroundColor={
            scenario === 2
              ? Colors.BACKGROUND_3
              : scenario !== 3 && isLeftWinner
              ? Colors.SUCCESS_600
              : Colors.BACKGROUND_3
          }
        />
        <Text style={styles.middleRowText}>القهوات</Text>
        <Circle
          backgroundColor={
            scenario === 2
              ? Colors.BACKGROUND_3
              : scenario !== 3 && !isLeftWinner
              ? Colors.SUCCESS_600
              : Colors.BACKGROUND_3
          }
        />
        {matchData.round === 3 ? (
          <Circle
            backgroundColor={
              scenario === 2
                ? Colors.BACKGROUND_3
                : scenario !== 3 && !isLeftWinner
                ? Colors.SUCCESS_600
                : Colors.BACKGROUND_3
            }
          />
        ) : null}
      </View>

      {scenario === 2 ? (
        <View style={styles.viewCountRow}>
          <Text style={styles.viewCountText}>
            {matchData.spectatorsCount ? matchData.spectatorsCount : 0}
          </Text>
          <Eye size="4.79" color="#A6ABB3" />
        </View>
      ) : null}

      <View style={styles.bottomRow}>
        <Player
          img={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.secondPlayer.realPlayer.pic.url
              : undefined
          }
          label={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.secondPlayer.realPlayer.name
              : '-'
          }
        />
        <View style={[styles.statusContainer, { backgroundColor }]}>
          <Text style={[styles.statusText, { color: endTextColor }]}>
            {endText}
          </Text>
          {scenario === 2 && <Eye size="6.38" color={Colors.PRIMARY_600} />}
        </View>
        <Player
          img={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.fourthPlayer.realPlayer.pic?.url
              : undefined
          }
          label={
            matchData.roomId && typeof matchData.roomId === 'object'
              ? matchData.roomId.players.fourthPlayer.realPlayer.name
              : '-'
          }
        />
      </View>
    </View>
  );
}

const Player: React.FC<{ label: string; img: string | undefined }> = ({
  label,
  img,
}) => (
  <View style={styles.iconLabelContainer}>
    <Image
      source={img ? { uri: img } : Images.EAGLE}
      style={{ width: 16, height: 16, borderRadius: 200 }}
    />
    <View style={styles.iconLabelTextContainer}>
      <Text style={styles.iconLabelText}>{label}</Text>
    </View>
  </View>
);

const ScoreBox: React.FC<{ score: number }> = ({ score }) => (
  <View style={styles.scoreBox}>
    <Text style={styles.scoreText}>{score}</Text>
  </View>
);

const Circle: React.FC<{ backgroundColor: string }> = ({ backgroundColor }) => (
  <View style={[styles.circle, { backgroundColor }]} />
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
  },
  card: {
    padding: 5,
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 8,
    width: 90,
    height: 75,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  scoreContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  roundText: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 5.58,
    color: 'white',
    marginBottom: 3.19,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 1,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.19,
    marginTop: 3.19,
  },
  middleRowText: {
    color: 'white',
    fontSize: 4,
    fontFamily: fonts.almaraiRegular,
  },
  viewCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.19,
    marginTop: 3.19,
  },
  viewCountText: {
    color: '#A6ABB3',
    fontSize: 4,
    fontFamily: fonts.almaraiRegular,
  },
  bottomRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    width: 40,
    height: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  statusText: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 4.79,
    marginRight: 4,
  },
  iconLabelContainer: {
    position: 'relative',
  },
  iconLabelTextContainer: {
    paddingHorizontal: 4.41,
    // paddingBottom: 2,
    backgroundColor: 'white',
    borderRadius: 4.2,
    position: 'relative',
    top: -4,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  iconLabelText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 4,
  },
  scoreBox: {
    width: 18,
    height: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2.39,
    backgroundColor: Colors.BACKGROUND_4,
  },
  scoreText: {
    fontFamily: fonts.almaraiBold,
    fontSize: 8,
    color: 'white',
  },
  circle: {
    width: 3.19,
    height: 3.19,
    borderRadius: 9999,
    elevation: 10,
    shadowColor: Colors.SUCCESS_600,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});

export default Match;
