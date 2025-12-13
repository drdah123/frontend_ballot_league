import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { fonts, Colors, LinearButton } from '@abdlarahman/shared';
import { CreateLeagueInput } from '../../types/league';

// Memoized TimeItem component for better performance
const TimeItem = memo(
  ({
    item,
    type,
    selectedValue,
  }: {
    item: number;
    type: 'hour' | 'minute';
    selectedValue: number;
  }) => {
    const isMain = item === selectedValue;
    const distance = Math.abs(item - selectedValue);

    // Calculate opacity based on distance
    const opacity = isMain
      ? 1
      : distance === 1
      ? 0.7
      : distance === 2
      ? 0.4
      : 0.2;

    const textStyle = {
      fontFamily: isMain ? fonts.almaraiBold : fonts.almaraiRegular,
      color: Colors.DEFAULT_WHITE,
      fontSize: isMain ? 16 : distance === 1 ? 14 : 12,
      textAlign: 'center' as const,
      opacity,
    };

    // For hours, append AM/PM
    const displayText =
      type === 'hour'
        ? `${item.toString().padStart(2, '0')} ${item < 12 ? 'AM' : 'PM'}`
        : item.toString().padStart(2, '0');

    return (
      <View
        style={[
          styles.timeItem,
          {
            transform: [{ scale: isMain ? 1.1 : distance === 1 ? 0.95 : 0.9 }],
          },
        ]}
      >
        <Text style={textStyle}>{displayText}</Text>
      </View>
    );
  }
);

TimeItem.displayName = 'TimeItem';

interface TimeSetProps {
  visible: boolean;
  onClose: () => void;
  onSelectTime: (time: string) => void;
  league: CreateLeagueInput;
}
// ! need to fix
export default function TimeSet({
  visible,
  onClose,
  onSelectTime,
  league,
}: TimeSetProps) {
  if (!visible) return null;

  const minuteListRef = useRef<FlashList<number>>(null);
  const hourListRef = useRef<FlashList<number>>(null);
  const isScrollingProgrammatically = useRef(false);

  const [selectedHour, setSelectedHour] = useState(
    league.startTime !== 'instant'
      ? parseInt(league.startTime.split(':')[0])
      : 6
  );
  const [selectedMinute, setSelectedMinute] = useState(
    league.startTime !== 'instant'
      ? parseInt(league.startTime.split(':')[1])
      : 34
  );

  const ITEM_HEIGHT = 30; // Height of each item for snapping
  const VISIBLE_ITEMS = 5; // Total visible items (main + 2 above + 2 below)

  // Generate arrays for hours (0-23) and minutes (0-59)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Function to scroll to center position
  const scrollToCenter = useCallback(
    (listRef: React.RefObject<FlashList<number> | null>, index: number) => {
      if (listRef.current) {
        const offset = index * ITEM_HEIGHT;
        listRef.current.scrollToOffset({ offset, animated: true });
      }
    },
    []
  );

  // Effect to center selected items when component mounts
  useEffect(() => {
    if (visible) {
      isScrollingProgrammatically.current = true;
      setTimeout(() => {
        scrollToCenter(minuteListRef, selectedMinute);
        scrollToCenter(hourListRef, selectedHour);
        setTimeout(() => {
          isScrollingProgrammatically.current = false;
        }, 300);
      }, 100);
    }
  }, [visible, scrollToCenter]); // Remove selectedMinute and selectedHour from dependencies

  const handleConfirm = useCallback(() => {
    const time = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute
      .toString()
      .padStart(2, '0')}`;
    onSelectTime(time);
    onClose();
  }, [selectedHour, selectedMinute, onSelectTime, onClose]);

  const handleScroll = useCallback(
    (
      event: any,
      type: 'hour' | 'minute',
      setValue: (value: number) => void,
      data: number[]
    ) => {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, data.length - 1));

      if (clampedIndex !== (type === 'hour' ? selectedHour : selectedMinute)) {
        setValue(data[clampedIndex]);
      }
    },
    [selectedHour, selectedMinute]
  );

  const handleMinuteScroll = useCallback(
    (event: any) => {
      handleScroll(event, 'minute', setSelectedMinute, minutes);
    },
    [handleScroll, minutes]
  );

  const handleHourScroll = useCallback(
    (event: any) => {
      handleScroll(event, 'hour', setSelectedHour, hours);
    },
    [handleScroll, hours]
  );

  // Handle scroll end to snap to center
  const handleMinuteScrollEnd = useCallback(() => {
    if (!isScrollingProgrammatically.current) {
      isScrollingProgrammatically.current = true;
      scrollToCenter(minuteListRef, selectedMinute);
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 300);
    }
  }, [scrollToCenter, selectedMinute]);

  const handleHourScrollEnd = useCallback(() => {
    if (!isScrollingProgrammatically.current) {
      isScrollingProgrammatically.current = true;
      scrollToCenter(hourListRef, selectedHour);
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 300);
    }
  }, [scrollToCenter, selectedHour]);

  const renderMinuteItem = useCallback(
    ({ item }: { item: number }) => (
      <TimeItem item={item} type="minute" selectedValue={selectedMinute} />
    ),
    [selectedMinute]
  );

  const renderHourItem = useCallback(
    ({ item }: { item: number }) => (
      <TimeItem item={item} type="hour" selectedValue={selectedHour} />
    ),
    [selectedHour]
  );

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <BlurView
          intensity={100}
          blurReductionFactor={10}
          tint="dark"
          style={[StyleSheet.absoluteFill, { backgroundColor: '#0000003d' }]}
        />
      </Pressable>
      <View style={styles.timeSetContainer}>
        <Text
          style={{
            color: '#ffff',
            fontFamily: fonts.almaraiRegular,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          التاريخ والوقت
        </Text>
        <View style={styles.timeContainer}>
          <View style={styles.cloContainer}>
            <Text
              style={{
                fontFamily: fonts.almaraiBold,
                color: Colors.DEFAULT_WHITE,
                fontSize: 15,
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
              دقيقة
            </Text>
            <View style={styles.listContainer}>
              <FlashList
                ref={minuteListRef}
                data={minutes}
                renderItem={renderMinuteItem}
                keyExtractor={(item: number) => `minute-${item}`}
                showsVerticalScrollIndicator={false}
                onScroll={handleMinuteScroll}
                onMomentumScrollEnd={handleMinuteScrollEnd}
                estimatedItemSize={ITEM_HEIGHT}
                contentContainerStyle={{
                  paddingVertical:
                    (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2,
                }}
              />
              {/* Selection indicator overlay */}
              <View style={styles.selectionIndicator} />
            </View>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: Colors.DEFAULT_WHITE,
              height: '100%',
            }}
          />
          <View style={[styles.cloContainer, { width: 100 }]}>
            {/* Wider for AM/PM */}
            <Text
              style={{
                fontFamily: fonts.almaraiBold,
                color: Colors.DEFAULT_WHITE,
                fontSize: 15,
                textAlign: 'right',
                marginBottom: 8,
              }}
            >
              ساعة
            </Text>
            <View style={styles.listContainer}>
              <FlashList
                ref={hourListRef}
                data={hours}
                renderItem={renderHourItem}
                keyExtractor={(item: number) => `hour-${item}`}
                showsVerticalScrollIndicator={false}
                onScroll={handleHourScroll}
                onMomentumScrollEnd={handleHourScrollEnd}
                estimatedItemSize={ITEM_HEIGHT}
                contentContainerStyle={{
                  paddingVertical:
                    (VISIBLE_ITEMS * ITEM_HEIGHT) / 2 - ITEM_HEIGHT / 2,
                }}
              />
              {/* Selection indicator overlay */}
              <View style={styles.selectionIndicator} />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 28, width: '100%' }}>
          <LinearButton
            text="تأكيد"
            textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
            onPress={handleConfirm}
            containerStyle={{
              width: '100%',
              height: 40,
            }}
            linearStyle={{
              width: '100%',
              height: 40,
              paddingVertical: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeSetContainer: {
    flexDirection: 'column',
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_5,
    width: '80%',
  },
  timeContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    height: 150,
  },
  cloContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 60,
  },
  timeItem: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    position: 'relative',
    height: 150,
    width: '100%',
  },
  selectionIndicator: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 30,
    marginTop: -15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.DEFAULT_WHITE + '30',
    pointerEvents: 'none',
  },
});
