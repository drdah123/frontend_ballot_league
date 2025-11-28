import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';
import IMPORTS from '../../../repeated_items/index';
import { icons } from './icons';

const fonts = IMPORTS.FONTS;
const Colors = IMPORTS.COLORS;
const LinearButton2 = IMPORTS.LINEAR_BUTTON_2;

interface LeagueSettingsModal2 {
  visible: boolean;
  onClose: () => void;
}

export default function LeagueSettingsModal2({
  visible,
  onClose,
}: LeagueSettingsModal2) {
  const [activeOption, setActiveOption] = useState<'instant' | 'scheduled'>(
    'instant'
  ); // For chat permission
  const [allowTeamSelection, setAllowTeamSelection] = useState<
    'instant' | 'scheduled'
  >('instant'); // For team selection
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] =
    useState<boolean>(false);
  const [isPlayersDropdownOpen, setIsPlayersDropdownOpen] =
    useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<string>('قهوة واحدة');
  const [selectedTeam, setSelectedTeam] = useState<string>('8 (16 لاعب)');

  const getClockSvgXml = (isActive: boolean) => {
    const strokeColor = isActive ? '#FFFDFA' : '#262B33';
    return icons.check2.replace(/stroke="#FDF5E9"/g, `stroke="${strokeColor}"`);
  };

  const getAgendaSvgXml = (isActive: boolean) => {
    const strokeColor = isActive ? '#FFFDFA' : '#262B33';
    return icons.noCheck.replace(
      /stroke="#262B33"/g,
      `stroke="${strokeColor}"`
    );
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
                    {selectedGame}
                  </Text>
                </View>
              </Pressable>
              {isGamesDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  <Pressable
                    onPress={() => {
                      setSelectedGame('قهوة واحدة');
                      setIsGamesDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>قهوة واحدة</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedGame('الأفضل من 3 قهوات');
                      setIsGamesDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>
                        الأفضل من 3 قهوات
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedGame('قهوة واحدة النهائي: الأفضل من 3');
                      setIsGamesDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>
                        قهوة واحدة النهائي: الأفضل من 3
                      </Text>
                    </View>
                  </Pressable>
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
                    {selectedTeam}
                  </Text>
                </View>
              </Pressable>
              {isPlayersDropdownOpen && (
                <View style={styles.dropdownContainer}>
                  <Pressable
                    onPress={() => {
                      setSelectedTeam('4 (8 لاعب)');
                      setIsPlayersDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>4 (8 لاعب)</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedTeam('8 (16 لاعب)');
                      setIsPlayersDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>8 (16 لاعب)</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectedTeam('16 (32 لاعب)');
                      setIsPlayersDropdownOpen(false);
                    }}
                  >
                    <View style={styles.dropItems}>
                      <Text style={styles.dropdownItemText}>16 (32 لاعب)</Text>
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 4, marginTop: 16 }}>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: 'right',
            }}
          >
            السماح للمشاهدين بالدردشة
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
            {/* Instant Option */}
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
                  paddingRight: 30,
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
                  مسموح
                </Text>
                <SvgXml
                  xml={getClockSvgXml(activeOption === 'instant')}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
            {/* Scheduled Option */}
            <Pressable onPress={() => setActiveOption('scheduled')}>
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
                  paddingRight: 30,
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
                  غير مسموح
                </Text>
                <SvgXml
                  xml={getAgendaSvgXml(activeOption === 'scheduled')}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'column', gap: 4, marginTop: 16 }}>
          <Text
            style={{
              fontFamily: fonts.almaraiRegular,
              color: Colors.DEFAULT_WHITE,
              fontSize: 10,
              textAlign: 'right',
            }}
          >
            السماح للاعبين باختيار الفريق
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
            {/* Instant Option */}
            <Pressable onPress={() => setAllowTeamSelection('instant')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8,
                  backgroundColor:
                    allowTeamSelection === 'instant'
                      ? Colors.PRIMARY_600
                      : 'transparent',
                  borderRadius: 8,
                  gap: 4,
                  width: 147.5,
                  justifyContent: 'flex-end',
                  paddingRight: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color:
                      allowTeamSelection === 'instant'
                        ? Colors.DEFAULT_WHITE
                        : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: 'right',
                  }}
                >
                  مسموح
                </Text>
                <SvgXml
                  xml={getClockSvgXml(allowTeamSelection === 'instant')}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
            {/* Scheduled Option */}
            <Pressable onPress={() => setAllowTeamSelection('scheduled')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8,
                  backgroundColor:
                    allowTeamSelection === 'scheduled'
                      ? Colors.PRIMARY_600
                      : 'transparent',
                  borderRadius: 8,
                  gap: 4,
                  width: 147.5,
                  justifyContent: 'flex-end',
                  paddingRight: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color:
                      allowTeamSelection === 'scheduled'
                        ? Colors.DEFAULT_WHITE
                        : Colors.BACKGROUND_3,
                    fontSize: 12,
                    textAlign: 'right',
                  }}
                >
                  غير مسموح
                </Text>
                <SvgXml
                  xml={getAgendaSvgXml(allowTeamSelection === 'scheduled')}
                  width={25}
                  height={25}
                />
              </View>
            </Pressable>
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
          <Pressable onPress={onClose}>
            <View style={{ ...styles.buttons, height: 0, marginTop: 8 }}>
              <LinearButton2
                text="إنشاء دوري"
                textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                onPress={() => {}}
                containerStyle={{
                  width: '100%',
                }}
                linearStyle={{
                  width: '100%',
                  height: 40,
                  paddingVertical: 0,
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// Styles remain unchanged
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
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
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
