import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { SvgXml } from 'react-native-svg';
import { useState, useEffect } from 'react';
import IMPORTS from '../../../repeated_items/index';
import { icons } from './icons';
import { CreateLeagueInput } from '../../types/league';

const fonts = IMPORTS.FONTS;
const Colors = IMPORTS.COLORS;
const LinearButton2 = IMPORTS.LINEAR_BUTTON_2;
const sharedIcons = IMPORTS.SHARED_ICONS;
import {
  ModalKeys,
  Select,
  SetLeagueHandler,
} from '../../types/components/createLeague';

interface LeagueSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  league: CreateLeagueInput;
  setLeague: SetLeagueHandler;
  setModalsHandler: (key: ModalKeys, value: boolean) => void;
}

const maxSeatsOptions: Select[] = [
  { label: '16 لاعب', value: '16' },
  { label: '32 لاعب', value: '32' },
  { label: '64 لاعب', value: '64' },
];
export type RoundTypeSelect =
  | {
      label: 'الأفضل من 3 قهوات';
      value: 'all_3';
    }
  | {
      label: 'قهوة واحدة النهائية: الأفضل من 3';
      value: 'just_final';
    }
  | {
      label: 'قهوة واحدة';
      value: 'all_1';
    };
const roundTypes: RoundTypeSelect[] = [
  { label: 'قهوة واحدة', value: 'all_1' },
  { label: 'الأفضل من 3 قهوات', value: 'all_3' },
  { label: 'قهوة واحدة النهائية: الأفضل من 3', value: 'just_final' },
];

export default function LeagueSettingsModal({
  visible,
  onClose,
  league: { roundType, maxSeats, startTime },
  setLeague,
  setModalsHandler,
}: LeagueSettingsModalProps) {
  const [activeOption, setActiveOption] = useState<'instant' | 'scheduled'>(
    startTime !== 'instant' ? 'scheduled' : 'instant'
  );
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] =
    useState<boolean>(false);
  const [isPlayersDropdownOpen, setIsPlayersDropdownOpen] =
    useState<boolean>(false);
  const [currentRoundType, setCurrentRoundType] = useState(
    roundTypes.find((option) => option.value === roundType) || roundTypes[0]
  );
  const [currentMaxSeats, setCurrentMaxSeats] = useState(
    maxSeatsOptions.find((option) => option.value === String(maxSeats)) ||
      maxSeatsOptions[0]
  );
  const [countdown, setCountdown] = useState<string>('');

  // Function to calculate countdown
  const calculateCountdown = () => {
    if (!startTime) {
      setCountdown('لم يتم تحديد وقت');
      return;
    }

    const [hours, minutes] = startTime.split(':').map(Number);
    const now = new Date();
    const selectedDate = new Date();
    selectedDate.setHours(hours, minutes, 0, 0);

    if (selectedDate < now) {
      selectedDate.setDate(selectedDate.getDate() + 1);
    }

    const diffMs = selectedDate.getTime() - now.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(diffSeconds / (3600 * 24));
    const hoursLeft = Math.floor((diffSeconds % (3600 * 24)) / 3600);
    const minutesLeft = Math.floor((diffSeconds % 3600) / 60);

    let countdownText = '';
    if (days > 0) {
      countdownText = `بعد ${days} يوم${days > 1 ? 'أيام' : ''}`;
    } else if (hoursLeft > 0) {
      countdownText = `بعد ${hoursLeft} ساعة${hoursLeft > 1 ? '' : ''}`;
    } else if (minutesLeft > 0) {
      countdownText = `بعد ${minutesLeft} دقيقة${
        minutesLeft > 1 ? 'دقائق' : ''
      }`;
    } else {
      countdownText = 'يبدأ الآن';
    }

    setCountdown(countdownText);
  };

  // Update countdown every minute and when startTime prop or activeOption changes
  useEffect(() => {
    if (activeOption === 'scheduled') {
      calculateCountdown();
      const interval = setInterval(calculateCountdown, 60000);
      return () => clearInterval(interval);
    } else {
      setCountdown('');
    }
  }, [startTime, activeOption]);

  const getClockSvgXml = (activeOption: string) => {
    const strokeColor = activeOption === 'instant';
    if (strokeColor) return sharedIcons.clock;
    return sharedIcons.clock.replace('stroke="#FFFDFA"', `stroke="#262B33"`);
  };

  const getScheduleSvgXml = (activeOption: string) => {
    const fillColor = activeOption === 'scheduled';
    if (!fillColor) return sharedIcons.schedule;
    return sharedIcons.schedule.replace('fill="#262B33"', `fill="#FFFDFA"`);
  };

  const handleSave = () => {
    setLeague('roundType', currentRoundType.value);
    setLeague('maxSeats', parseInt(currentMaxSeats.value) as 64 | 32 | 16);
    setLeague('startTime', activeOption === 'instant' ? 'instant' : startTime);

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
          intensity={100}
          blurReductionFactor={10}
          tint="dark"
          style={[StyleSheet.absoluteFill, { backgroundColor: '#0000003d' }]}
        />
      </Pressable>
      <View style={styles.editLugeContainer}>
        <Text
          style={{
            color: '#fff',
            fontFamily: fonts.almaraiRegular,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          إعدادات الدوري
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
            <Pressable onPress={() => setActiveOption('instant')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8,
                  backgroundColor:
                    activeOption === 'instant'
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
                      activeOption === 'instant'
                        ? Colors.DEFAULT_WHITE
                        : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: 'right',
                  }}
                >
                  فوري (خلال 15 دقيقة)
                </Text>
                <SvgXml
                  xml={getClockSvgXml(activeOption)}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setActiveOption('scheduled');
                setModalsHandler('isTimeSetVisible', true);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8,
                  backgroundColor:
                    activeOption === 'scheduled'
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
                      activeOption === 'scheduled'
                        ? Colors.DEFAULT_WHITE
                        : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: 'right',
                  }}
                >
                  {activeOption === 'scheduled' && countdown
                    ? `مجدول (${countdown})`
                    : 'مجدول'}
                </Text>
                <SvgXml
                  xml={getScheduleSvgXml(activeOption)}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.gameControl}>
          <View style={styles.tamsAndGames}>
            <Text
              style={{
                fontFamily: fonts.almaraiRegular,
                color: Colors.DEFAULT_WHITE,
                fontSize: 10,
                textAlign: 'right',
              }}
            >
              المباريات
            </Text>
            <View style={{ position: 'relative' }}>
              <Pressable
                onPress={() => setIsGamesDropdownOpen(!isGamesDropdownOpen)}
              >
                <View style={styles.boxContainer}>
                  {isGamesDropdownOpen ? (
                    <SvgXml xml={icons.topAroow} />
                  ) : (
                    <SvgXml xml={icons.botoomArrow} />
                  )}
                  <Text
                    style={{
                      fontFamily: fonts.almaraiRegular,
                      color: Colors.DEFAULT_WHITE,
                      fontSize: 12,
                      textAlign: 'right',
                    }}
                  >
                    {currentRoundType.label}
                  </Text>
                </View>
              </Pressable>
              {isGamesDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  {roundTypes.map((option) => (
                    <Pressable
                      key={option.value}
                      onPress={() => {
                        setCurrentRoundType(option);
                        setIsGamesDropdownOpen(false);
                      }}
                    >
                      <View style={styles.dropItems}>
                        <Text style={styles.dropdownItemText}>
                          {option.label}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={styles.tamsAndGames}>
            <Text
              style={{
                fontFamily: fonts.almaraiRegular,
                color: Colors.DEFAULT_WHITE,
                fontSize: 10,
                textAlign: 'right',
              }}
            >
              عدد الفرق
            </Text>
            <View style={{ position: 'relative' }}>
              <Pressable
                onPress={() => setIsPlayersDropdownOpen(!isPlayersDropdownOpen)}
              >
                <View style={styles.boxContainer}>
                  {isPlayersDropdownOpen ? (
                    <SvgXml xml={icons.topAroow} />
                  ) : (
                    <SvgXml xml={icons.botoomArrow} />
                  )}
                  <Text
                    style={{
                      fontFamily: fonts.almaraiRegular,
                      color: Colors.DEFAULT_WHITE,
                      fontSize: 12,
                      textAlign: 'right',
                    }}
                  >
                    {currentMaxSeats.label}
                  </Text>
                </View>
              </Pressable>
              {isPlayersDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  {maxSeatsOptions.map((option) => (
                    <Pressable
                      key={option.value}
                      onPress={() => {
                        setCurrentMaxSeats(option);
                        setIsPlayersDropdownOpen(false);
                      }}
                    >
                      <View style={styles.dropItems}>
                        <Text style={styles.dropdownItemText}>
                          {option.label}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>
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
          <Pressable>
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
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 1]}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
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
  boxContainer: {
    width: 149.5,
    height: 32.45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 5.48,
    backgroundColor: Colors.BACKGROUND_4,
  },
  dropdownContainer: {
    position: 'absolute',
    top: -110,
    right: 0,
    width: 149.5,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 5.48,
    zIndex: 10,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 6,
    flexDirection: 'column',
    gap: 4,
  },
  dropdownItemText: {
    fontFamily: fonts.almaraiRegular,
    color: Colors.PRIMARY_500,
    fontSize: 12,
    textAlign: 'center',
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
  dropItems: {
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 8,
    paddingVertical: 4,
  },
});
