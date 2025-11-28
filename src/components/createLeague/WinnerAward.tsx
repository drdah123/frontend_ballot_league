import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { SvgXml } from 'react-native-svg';
import { useEffect, useMemo, useState } from 'react';
import IMPORTS from '../../../repeated_items/index';
import { icons } from './icons';
import { CreateLeagueInput } from '../../types/league';

const fonts = IMPORTS.FONTS;
const Colors = IMPORTS.COLORS;
const LinearButton2 = IMPORTS.LINEAR_BUTTON_2;
import {
  ModalKeys,
  SetLeagueHandler,
} from '../../types/components/createLeague';

interface WinnerAward {
  league: CreateLeagueInput;
  setLeague: SetLeagueHandler;
  setModalsHandler: (key: ModalKeys, value: boolean) => void;
  modals: Record<ModalKeys, boolean>;
}

export default function WinnerAward({
  league,
  setLeague,
  setModalsHandler,
  modals,
}: WinnerAward) {
  const visible = useMemo(() => {
    return modals.isFirstWinnerVisible || modals.isSecondWinnerVisible;
  }, [modals.isFirstWinnerVisible, modals.isSecondWinnerVisible]);

  const winnerType: 'isSecondWinnerVisible' | 'isFirstWinnerVisible' =
    useMemo(() => {
      return modals.isSecondWinnerVisible
        ? 'isSecondWinnerVisible'
        : 'isFirstWinnerVisible';
    }, [modals.isSecondWinnerVisible, modals.isFirstWinnerVisible]);
  const [inputValue, setInputValue] = useState(0);
  useEffect(() => {
    setInputValue(
      modals.isFirstWinnerVisible
        ? league.prizes.winnerPrize
        : league.prizes.secondWinnerPrize || 0
    );
  }, [modals.isFirstWinnerVisible, modals.isSecondWinnerVisible]);
  function handleConfirm() {
    if (winnerType === 'isFirstWinnerVisible') {
      setLeague('prizes', { ...league.prizes, winnerPrize: inputValue });
    } else {
      setLeague('prizes', { ...league.prizes, secondWinnerPrize: inputValue });
    }

    setModalsHandler(winnerType, false);
  }
  function onClose() {
    setModalsHandler(winnerType, false);
  }
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
          الجائزة {winnerType === 'isFirstWinnerVisible' ? 'الأولى' : 'الثانية'}
        </Text>
        <Text
          style={{
            fontFamily: fonts.almaraiRegular,
            color: Colors.DEFAULT_WHITE,
            fontSize: 10,
            textAlign: 'right',
            marginTop: 16,
          }}
        >
          حدد جائزة المركز{' '}
          {winnerType === 'isFirstWinnerVisible' ? 'الأول' : 'الثاني'}
        </Text>
        <View style={styles.inputContainer}>
          <SvgXml xml={icons.dimond} />
          <TextInput
            placeholder="7000"
            style={styles.inputStyle}
            placeholderTextColor={'#616671'}
            value={inputValue.toString()}
            onChangeText={(text) => setInputValue(Number(text))}
            keyboardType="numeric"
          />
        </View>
        <View style={{ marginTop: 28, width: '100%' }}>
          <LinearButton2
            text="تأكيد"
            textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
            onPress={handleConfirm}
            containerStyle={{
              width: '100%',
              height: 40,
            }}
            colors={['#EFB054', '#FFAF36']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 1]}
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
    width: '85%',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 4,
    marginTop: 4,
  },
  inputStyle: {
    backgroundColor: 'transparent',
    flex: 1,
    fontFamily: fonts.almaraiRegular,
    fontSize: 14,
    color: 'white',
    textAlign: 'right',
  },
});
