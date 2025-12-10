import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
  clamp,
  withSpring,
} from 'react-native-reanimated';
import { Colors, fonts, chatStyles } from '@abdlarahman/ui-components';
import Match from './Match';
import { ApiMatch, IMatch } from '../../types/league';

const styles = chatStyles;

// Constants
const TOURNAMENT_STAGES = {
  ROUND_OF_32: '32 Teams',
  ROUND_OF_16: '16 Teams',
  QUARTER_FINALS: '8 Teams',
  SEMI_FINALS: '4 Teams',
  FINALS: 'Final',
} as const;

const STAGE_OFFSETS = {
  16: {
    [TOURNAMENT_STAGES.ROUND_OF_16]: { x: 100, y: 0 },
    [TOURNAMENT_STAGES.QUARTER_FINALS]: { x: 0, y: 0 },
    [TOURNAMENT_STAGES.SEMI_FINALS]: { x: -100, y: 0 },
    [TOURNAMENT_STAGES.FINALS]: { x: -200, y: 0 },
  },

  8: {
    [TOURNAMENT_STAGES.ROUND_OF_16]: { x: 100, y: 0 },
    [TOURNAMENT_STAGES.QUARTER_FINALS]: { x: 0, y: 0 },
    [TOURNAMENT_STAGES.SEMI_FINALS]: { x: -75, y: 0 },
    [TOURNAMENT_STAGES.FINALS]: { x: -150, y: 0 },
  },
  4: {
    [TOURNAMENT_STAGES.ROUND_OF_16]: { x: 100, y: 0 },
    [TOURNAMENT_STAGES.QUARTER_FINALS]: { x: 0, y: 0 },
    [TOURNAMENT_STAGES.SEMI_FINALS]: { x: -100, y: 0 },
    [TOURNAMENT_STAGES.FINALS]: { x: -200, y: 0 },
  },
  2: {
    [TOURNAMENT_STAGES.QUARTER_FINALS]: { x: 0, y: 0 },
    [TOURNAMENT_STAGES.SEMI_FINALS]: { x: -100, y: 0 },
    [TOURNAMENT_STAGES.FINALS]: { x: -200, y: 0 },
    [TOURNAMENT_STAGES.ROUND_OF_32]: { x: 50, y: 0 },
    [TOURNAMENT_STAGES.ROUND_OF_16]: { x: 25, y: 0 },
  },
};
const STAGE_SCALE = {
  16: {
    [TOURNAMENT_STAGES.ROUND_OF_16]: 0.6,
    [TOURNAMENT_STAGES.QUARTER_FINALS]: 1,
    [TOURNAMENT_STAGES.SEMI_FINALS]: 1.5,
    [TOURNAMENT_STAGES.FINALS]: 1.6,
  },
  8: {
    [TOURNAMENT_STAGES.ROUND_OF_16]: 0.6,
    [TOURNAMENT_STAGES.QUARTER_FINALS]: 0.6,
    [TOURNAMENT_STAGES.SEMI_FINALS]: 1.25,
    [TOURNAMENT_STAGES.FINALS]: 1.5,
  },
  4: {
    [TOURNAMENT_STAGES.SEMI_FINALS]: 0.6,
    [TOURNAMENT_STAGES.FINALS]: 1.25,
  },
  2: {
    [TOURNAMENT_STAGES.ROUND_OF_32]: 0.6,
    [TOURNAMENT_STAGES.ROUND_OF_16]: 1.25,
  },
};
const STAGES_GAPS = {
  betweenGroups: {
    16: {
      16: 10,
      8: 100,
      4: 275,
      2: 620,
    },
    8: {
      8: 10,
      4: 100,
      2: 275,
    },
    4: {
      4: 10,
      2: 100,
    },
  },
};
// Layout constants
const BRACKET_GAP = 75;
const CONNECTING_LINE_OFFSET = -75;
const CONNECTING_LINE_LEFT = 90;

// Animation constants
const GESTURE_BOUNDS = {
  SCALE_MIN: 0.5,
  SCALE_MAX: 3,
  TRANSLATE_X_MIN: -150,
  TRANSLATE_X_MAX: 150,
  TRANSLATE_Y_MIN: -100,
  TRANSLATE_Y_MAX: 200,
};

const ANIMATION_DURATION = 500;

// Types
type TournamentStage =
  (typeof TOURNAMENT_STAGES)[keyof typeof TOURNAMENT_STAGES];
type OrganizedMatches = Record<TournamentStage, ApiMatch[]>;

// Components
function TabButton({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <View style={[styl.tab, isSelected && styl.selectedTab]}>
        <Text style={[styl.tabText, isSelected && styl.selectedTabText]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

function ConnectingLines({
  top,
  right,
  left,
  height,
  gap,
  isLeft = true,
  rightLineTop,
}: {
  top: number;
  right?: number;
  left?: number;
  height: number;
  isLeft?: boolean;
  gap: number;
  rightLineTop?: number;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        top,
        right: isLeft ? undefined : right,
        left: isLeft ? left : undefined,
      }}
    >
      <View style={{ flexDirection: 'column', gap }}>
        <View style={styl.connectingLine} />
        <View style={styl.connectingLine} />
      </View>
      <View style={[styl.verticalLine, { height }]} />
      <View
        style={[
          styl.horizontalLine,
          {
            top: rightLineTop || height / 2 - 1,
            left: isLeft ? undefined : -50,
            right: right !== undefined ? -50 : undefined,
          },
        ]}
      />
    </View>
  );
}

const defaultMatch: ApiMatch = {
  league: '',
  round: 1,
  // @ts-ignore
  stage: 'none',
  // @ts-ignore
  team1: '',
  // @ts-ignore
  team2: '',
  isFinal: false,
  roundWinners: [],
  roomId: '',
  scoreLeft: 0,
  scoreRight: 0,
  viewers: 0,
  leftTeam: { name: '-' },
  rightTeam: { name: '-' },
};
// Constants for cleaner code
const LINE_COLOR = '#5A5B5A';

// Main Component
export default function Plan({
  matches,
  participantsNumber,
}: {
  matches: ApiMatch[];
  participantsNumber: 64 | 32 | 16 | 8;
}) {
  participantsNumber = 8 * 4;
  // Calculate tournament size based on participants
  const tournamentSize: 16 | 8 | 4 = useMemo(
    () => (participantsNumber / 4) as 16 | 8 | 4,
    [participantsNumber]
  );

  // Get relevant stages based on tournament size
  const relevantStages = useMemo(() => {
    const stages: TournamentStage[] = [];
    if (tournamentSize >= 16) stages.push(TOURNAMENT_STAGES.ROUND_OF_32);
    if (tournamentSize >= 8) stages.push(TOURNAMENT_STAGES.ROUND_OF_16);
    if (tournamentSize >= 4) stages.push(TOURNAMENT_STAGES.QUARTER_FINALS);
    stages.push(TOURNAMENT_STAGES.SEMI_FINALS);
    stages.push(TOURNAMENT_STAGES.FINALS);
    return stages;
  }, [tournamentSize]);

  // Get initial stage based on tournament size
  const getInitialStage = (size: number): TournamentStage => {
    if (size >= 16) return TOURNAMENT_STAGES.ROUND_OF_16;
    if (size >= 8) return TOURNAMENT_STAGES.QUARTER_FINALS;
    return TOURNAMENT_STAGES.SEMI_FINALS;
  };

  const [selectedStage, setSelectedStage] = useState<TournamentStage>(
    getInitialStage(tournamentSize)
  );

  // Organize matches into tournament stages
  const organizedMatches: OrganizedMatches = useMemo(() => {
    const getSliceEnd = (start: number, count: number) =>
      Math.min(start + count, matches.length);

    return {
      [TOURNAMENT_STAGES.ROUND_OF_32]: matches.slice(0, getSliceEnd(0, 16)),
      [TOURNAMENT_STAGES.ROUND_OF_16]: matches.slice(16, getSliceEnd(16, 8)),
      [TOURNAMENT_STAGES.QUARTER_FINALS]: matches.slice(24, getSliceEnd(24, 4)),
      [TOURNAMENT_STAGES.SEMI_FINALS]: matches.slice(28, getSliceEnd(28, 2)),
      [TOURNAMENT_STAGES.FINALS]: matches.slice(30, getSliceEnd(30, 1)),
    };
  }, [matches]);
  // Gesture handling with dynamic initial scale
  const getInitialScale = (size: number) => {
    switch (size) {
      case 16:
        return 0.6;
      case 8:
        return 1.25;
      case 4:
        return 1.5;
      default:
        return 1;
    }
  };

  const scale = useSharedValue(getInitialScale(tournamentSize));
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    scale.value = clamp(
      event.scale,
      GESTURE_BOUNDS.SCALE_MIN,
      GESTURE_BOUNDS.SCALE_MAX
    );
  });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Store the current position
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Calculate new position without clamping
      const newX = offsetX.value + event.translationX;
      const newY = offsetY.value + event.translationY;

      // Set the position, allowing it to go beyond bounds during drag
      translateX.value = newX;
      translateY.value = newY;
    })
    .onEnd((event) => {
      const minX = GESTURE_BOUNDS.TRANSLATE_X_MIN * scale.value;
      const maxX = GESTURE_BOUNDS.TRANSLATE_X_MAX * scale.value;
      const minY = GESTURE_BOUNDS.TRANSLATE_Y_MIN * scale.value;
      const maxY = GESTURE_BOUNDS.TRANSLATE_Y_MAX * scale.value;

      // Calculate velocity multiplier based on gesture speed
      const velocityMultiplier = 0.5;

      if (Math.abs(event.velocityX) > 500 || Math.abs(event.velocityY) > 500) {
        // Fast gesture - apply throw with decay
        translateX.value = withDecay({
          velocity: event.velocityX * velocityMultiplier,
          clamp: [minX, maxX],
        });

        translateY.value = withDecay({
          velocity: event.velocityY * velocityMultiplier,
          clamp: [minY, maxY],
        });
      } else {
        // Slow gesture - just spring back if out of bounds
        if (translateX.value < minX) {
          translateX.value = withSpring(minX, { damping: 15, stiffness: 150 });
        } else if (translateX.value > maxX) {
          translateX.value = withSpring(maxX, { damping: 15, stiffness: 150 });
        }

        if (translateY.value < minY) {
          translateY.value = withSpring(minY, { damping: 15, stiffness: 150 });
        } else if (translateY.value > maxY) {
          translateY.value = withSpring(maxY, { damping: 15, stiffness: 150 });
        }
      }
    });

  const combinedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  // ! need to implement tab press handler
  function handleTabPress(stage: TournamentStage) {
    if (stage === selectedStage) return; // Prevent re-selection
    setSelectedStage(stage);

    // @ts-ignore
    scale.value = withTiming(STAGE_SCALE[tournamentSize][stage], {
      duration: ANIMATION_DURATION,
    });

    translateX.value = withTiming(
      STAGE_OFFSETS[tournamentSize][
        stage as keyof (typeof STAGE_OFFSETS)[typeof tournamentSize]
      ].x || 100,
      {
        duration: ANIMATION_DURATION,
      }
    );

    // @ts-ignore
    translateY.value = withTiming(STAGE_OFFSETS[tournamentSize][stage].y || 0, {
      duration: ANIMATION_DURATION,
    });
  }

  // Unified stage renderer component
  function RenderStage({
    stage,
    stageSize,
    matchCount,
    useOrganizedMatches = false,
  }: {
    stage: TournamentStage;
    stageSize: number;
    matchCount: number;
    useOrganizedMatches?: boolean;
  }) {
    const getGapValue = () => {
      // Handle special cases for different stage sizes
      if (stageSize === 16 && tournamentSize >= 16) {
        return STAGES_GAPS.betweenGroups[16][16];
      }
      if (stageSize === 8 && tournamentSize >= 8) {
        return STAGES_GAPS.betweenGroups[tournamentSize as 8][8];
      }
      // For standard cases (4, 2)
      const gaps = STAGES_GAPS.betweenGroups[tournamentSize];
      if (gaps && stageSize in gaps) {
        return gaps[stageSize as keyof typeof gaps];
      }
      return 100; // fallback gap
    };

    const gap = getGapValue();
    const isFinalsStage = stage === TOURNAMENT_STAGES.FINALS;
    let editedMatches = useMemo(
      () => matches.filter((match) => match.stage === stage),
      [matches]
    );
    if (editedMatches.length === 0) {
      editedMatches = Array.from({ length: matchCount }, () => ({
        ...defaultMatch,
        stage,
        scenario: 3, // Default to upcoming scenario
      }));
    }

    return (
      <View style={{ gap }}>
        {editedMatches.map((match, index) => (
          <View key={match._id || `${stage}-group-${index}`} style={{ gap }}>
            <Match
              // @ts-ignore
              scenario={match.scenario ? 3 : match.winnerTeam ? 1 : 2}
              match={changeStagesToAR(stage)}
              matchData={match}
            />
            {index % 2 === 0 && !isFinalsStage ? (
              <ConnectingLines
                top={40}
                right={CONNECTING_LINE_OFFSET}
                height={gap + 4 + 75}
                gap={gap + 75}
                left={CONNECTING_LINE_LEFT}
              />
            ) : null}
          </View>
        ))}
      </View>
    );
  }

  function RenderTournamentBracket() {
    return (
      <View style={styl.bracketContainer}>
        {tournamentSize >= 16 ? (
          <RenderStage
            stage={TOURNAMENT_STAGES.ROUND_OF_32}
            stageSize={16}
            matchCount={16}
            useOrganizedMatches={false}
          />
        ) : null}
        {tournamentSize >= 8 ? (
          <RenderStage
            stage={TOURNAMENT_STAGES.ROUND_OF_16}
            stageSize={8}
            matchCount={8}
            useOrganizedMatches={false}
          />
        ) : null}
        {tournamentSize >= 4 ? (
          <RenderStage
            stage={TOURNAMENT_STAGES.QUARTER_FINALS}
            stageSize={4}
            matchCount={4}
            useOrganizedMatches={false}
          />
        ) : null}
        <RenderStage
          stage={TOURNAMENT_STAGES.SEMI_FINALS}
          stageSize={2}
          matchCount={2}
          useOrganizedMatches={true}
        />
        <RenderStage
          stage={TOURNAMENT_STAGES.FINALS}
          stageSize={1}
          matchCount={1}
          useOrganizedMatches={true}
        />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styl.container}>
      <View style={styl.mainContainer}>
        <View style={styl.contentContainer}>
          {/* <View style={styl.tabContainer}>
            {relevantStages.slice(1).map((stage) => (
              <TabButton
                key={stage}
                label={changeStagesToAR(stage)}
                isSelected={selectedStage === stage}
                onPress={() => handleTabPress(stage)}
              />
            ))}
          </View> */}

          <GestureDetector gesture={combinedGesture}>
            <Animated.View style={[styl.matchesContainer, animatedStyle]}>
              <RenderTournamentBracket />
            </Animated.View>
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
function changeStagesToAR(stage: IMatch['stage']) {
  switch (stage) {
    case '32 Teams':
      return '32 دور';
    case '16 Teams':
      return 'دور 16';
    case '8 Teams':
      return 'ربع نهائي';
    case '4 Teams':
      return 'نصف نهائي';
    case 'Final':
      return 'نهائي';
    default:
      return stage;
  }
}
const styl = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    ...styles.viewContainer,
    backgroundColor: Colors.DEFAULT_BLACK,
    height: '100%',
    flexGrow: undefined,
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
    transform: [{ translateY: -450 }],
  },
  tabContainer: {
    width: '100%',
    backgroundColor: Colors.BACKGROUND_5,
    padding: 8,
    zIndex: 8,
    // marginTop: 40,
    position: 'absolute',
    top: 70,
    left: 10,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  matchesContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200%',
    position: 'relative',
  },
  bracketContainer: {
    flexDirection: 'row',
    gap: BRACKET_GAP,
    alignItems: 'center',
    height: '100%',
  },
  tab: {
    borderWidth: 1,
    borderColor: 'transparent',
    paddingVertical: 6,
    paddingHorizontal: 2,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: Colors.PRIMARY_600,
  },
  tabText: {
    color: 'white',
    fontFamily: fonts.almaraiRegular,
  },
  selectedTabText: {
    color: Colors.DEFAULT_WHITE,
  },
  connectingLine: {
    width: 25,
    height: 2,
    backgroundColor: LINE_COLOR,
  },
  verticalLine: {
    width: 2,
    backgroundColor: LINE_COLOR,
  },
  horizontalLine: {
    width: 50,
    height: 2,
    backgroundColor: LINE_COLOR,
    position: 'absolute',
  },
});
