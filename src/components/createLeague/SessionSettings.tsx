import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { SvgXml } from 'react-native-svg';
import React, { useState, useMemo, SetStateAction, Dispatch } from 'react';
import {
  fonts,
  Colors,
  LinearButton2,
  sharedIcons,
  SelectRoom,
} from '@abdlarahman/shared';
import { icons } from './icons';
import { CreateLeagueInput } from '../../types/league';
import {
  Select,
  SelectPlaySpeed,
  SelectPlayType,
} from '../../types/components/createLeague';
interface SessionSettingsProps {
  visible: boolean;
  onClose: () => void;
  league: CreateLeagueInput;
  setLeague: (key: keyof CreateLeagueInput, value: any) => void;
}
const levels: Select[] = [
  {
    label: 'مبتدئ',
    value: 'beginner',
  },
  {
    label: 'متوسط',
    value: 'intermediate',
  },
  {
    label: 'متقدم',
    value: 'advanced',
  },

  {
    label: 'خبير',
    value: 'expert',
  },
];
export default function SessionSettings({
  visible,
  onClose,
  league: { playType, playSpeed, levelName },
  setLeague,
}: SessionSettingsProps) {
  const [currentPlayType, setCurrentPlayType] = useState<SelectPlayType>(
    playTypeOptions.find((option) => option.value === playType) ||
      playTypeOptions[0]
  );
  const [currentPlaySpeed, setCurrentPlaySpeed] = useState<SelectPlaySpeed>(
    speedOptions.find((option) => option.value === playSpeed) || speedOptions[0]
  );
  const [currentSelectedLevel, setCurrentSelectedLevel] = useState<Select>(
    levels.find((level) => level.value === levelName) || levels[0]
  );

  const handleSave = () => {
    setLeague('playType', currentPlayType.value);
    setLeague('playSpeed', currentPlaySpeed.value);
    setLeague('levelName', currentSelectedLevel.value);
    onClose();
  };

  if (!visible) return null;

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
          intensity={12}
          blurReductionFactor={10}
          experimentalBlurMethod="dimezisBlurView"
          style={[StyleSheet.absoluteFill]}
        />
      </Pressable>
      <View style={styles.editLugeContainer}>
        <Text
          style={{
            color: '#939599',
            fontFamily: fonts.almaraiRegular,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          إعدادات الجلسة
        </Text>
        <View style={{ flexDirection: 'column', gap: 4 }}>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: 'right',
            }}
          >
            نوع الدوري
          </Text>
          <View
            style={{
              padding: 4,
              borderRadius: 8,
              backgroundColor: Colors.BACKGROUND_4,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {playTypeOptions.map((option) => (
              <PlayTypeItem
                key={option.label}
                data={option}
                currentPlayType={currentPlayType}
                setCurrentPlayType={setCurrentPlayType}
              />
            ))}
          </View>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: 'right',
              marginTop: 12,
            }}
          >
            سرعة اللعب
          </Text>
          <View
            style={{
              padding: 4,
              borderRadius: 8,
              backgroundColor: Colors.BACKGROUND_4,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {speedOptions.map((option) => (
              <SpeedItem
                key={option.label}
                data={option}
                currentPlaySpeed={currentPlaySpeed}
                setCurrentPlaySpeed={setCurrentPlaySpeed}
              />
            ))}
          </View>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: 'right',
              marginTop: 12,
            }}
          >
            مستوى اللعب
          </Text>
          <SelectRoom
            data={levels}
            placeholder="اختر المستوى"
            selectedValue={levelName}
            setSelected={
              ((value: Select) => {
                setCurrentSelectedLevel(value);
              }) as Dispatch<SetStateAction<Select>>
            }
            BasicButton={({ onPress }) => (
              <Pressable onPress={onPress}>
                <View style={styles.boxContainer}>
                  <SvgXml xml={icons.botoomArrow} />
                  <Text
                    style={{
                      fontFamily: fonts.almaraiRegular,
                      color: Colors.DEFAULT_WHITE,
                      fontSize: 12,
                      textAlign: 'right',
                    }}
                  >
                    {currentSelectedLevel.label}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={onClose}>
            <View
              style={{
                ...styles.buttons,
                backgroundColor: Colors.BACKGROUND_4,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.almaraiBold,
                  color: Colors.DEFAULT_WHITE,
                  fontSize: 12,
                }}
              >
                عودة
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={handleSave}>
            <View style={{ ...styles.buttons, height: 0, marginTop: 8 }}>
              <LinearButton2
                text="حفظ"
                textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                onPress={handleSave}
                containerStyle={{
                  width: '100%',
                }}
                linearStyle={{
                  width: '100%',
                  height: 40,
                  paddingVertical: 0,
                }}
                colors={['#EFB054', '#FFAF36']}
                locations={[0, 1]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const playTypeOptions: SelectPlayType[] = [
  { label: 'لعب حر', value: 'free' },
  { label: 'لعب محدود', value: 'limited' },
];

function PlayTypeItem({
  setCurrentPlayType,
  currentPlayType,
  data,
}: {
  setCurrentPlayType: React.Dispatch<React.SetStateAction<SelectPlayType>>;
  currentPlayType: SelectPlayType;
  data: SelectPlayType;
}) {
  const changePlayTypeIcon = useMemo(() => {
    if (currentPlayType.value === data.value)
      return sharedIcons[`${data.value}_play`];
    return sharedIcons[`${data.value}_play`].replaceAll(
      `fill="white"`,
      `fill="${Colors.BACKGROUND_3}"`
    );
  }, [currentPlayType.value]);
  return (
    <Pressable
      onPress={() =>
        setCurrentPlayType({
          // @ts-ignore
          label: data.label,
          // @ts-ignore
          value: data.value,
        })
      }
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          backgroundColor:
            currentPlayType.value === data.value
              ? Colors.PRIMARY_600
              : 'transparent',
          borderRadius: 8,
          gap: 4,
          width: 147.5,
          justifyContent: 'flex-end',
        }}
      >
        <Text
          style={{
            fontFamily: fonts.almaraiRegular,
            color:
              currentPlayType.value === data.value
                ? Colors.DEFAULT_WHITE
                : Colors.BACKGROUND_3,
            fontSize: 12,
            textAlign: 'right',
          }}
        >
          {data.label}
        </Text>
        <SvgXml xml={changePlayTypeIcon} width={25} height={25} />
      </View>
    </Pressable>
  );
}
const speedOptions: SelectPlaySpeed[] = [
  { label: '5', value: 'fast' },
  { label: '10', value: 'normal' },
  { label: '30', value: 'slow' },
];
function SpeedItem({
  data,
  currentPlaySpeed,
  setCurrentPlaySpeed,
}: {
  data: SelectPlaySpeed;
  currentPlaySpeed: SelectPlaySpeed;
  setCurrentPlaySpeed: React.Dispatch<React.SetStateAction<SelectPlaySpeed>>;
}) {
  const changePlaySpeedIcon = useMemo(() => {
    if (currentPlaySpeed.label === data.label)
      return sharedIcons[`play_speed_${data.label}`];
    return sharedIcons[`play_speed_${currentPlaySpeed.label}`]
      .replaceAll(`fill="white"`, `fill="${Colors.BACKGROUND_3}"`)
      .replace('stroke="white"', `stroke="${Colors.BACKGROUND_3}"`);
  }, [currentPlaySpeed.label]);
  return (
    <Pressable onPress={() => setCurrentPlaySpeed(data)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          backgroundColor:
            currentPlaySpeed.label === data.label
              ? Colors.PRIMARY_600
              : 'transparent',
          borderRadius: 8,
          gap: 4,
          width: 97,
          justifyContent: 'flex-end',
        }}
      >
        <Text
          style={{
            fontFamily: fonts.almaraiRegular,
            color:
              currentPlaySpeed.label === data.label
                ? Colors.DEFAULT_WHITE
                : Colors.BACKGROUND_3,
            fontSize: 12,
            textAlign: 'right',
          }}
        >
          {data.label} ث
        </Text>
        <SvgXml xml={changePlaySpeedIcon} width={25} height={25} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  editLugeContainer: {
    flexDirection: 'column',
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_5,
  },
  gameControl: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  tamsAndGames: {
    flexDirection: 'column',
    gap: 4,
  },
  buttonsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  buttons: {
    width: 149.5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  boxContainer: {
    width: 307,
    height: 32.45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 5.48,
    backgroundColor: Colors.BACKGROUND_4,
  },
  bottomSheetContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 16,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BACKGROUND_4,
  },
  bottomSheetContentText: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
});
