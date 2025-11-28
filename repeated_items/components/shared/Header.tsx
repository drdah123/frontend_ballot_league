import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import Colors from '../../constants/Colors';
import fonts from '../../constants/fonts';
import AppBlur from './AppBlur';
import { svgs } from '../friends/svg';

export default function Header({
  name,
  LeftItem,
  containerStyle,
  leftItemOnPress,
}: {
  name: string;
  LeftItem?: React.FunctionComponent<{ onPress?(): void }> | string;
  containerStyle?: ViewStyle;
  leftItemOnPress?: () => void;
}) {
  const router = useRouter();

  return (
    <AppBlur style={{ ...styles.headerContainer, ...containerStyle }}>
      {LeftItem && typeof LeftItem === 'string' ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity style={styles.backButton} onPress={leftItemOnPress}>
            <Text style={styles.backButtonText}>{LeftItem}</Text>
          </TouchableOpacity>
        </View>
      ) : LeftItem ? (
        <LeftItem onPress={leftItemOnPress} />
      ) : (
        <View style={styles.flexContainer} />
      )}
      <View style={styles.centerContainer}>
        <View style={styles.insetShadowContent}>
          <Text style={styles.createSessionText}>{name}</Text>
        </View>
      </View>
      <View style={styles.flexEndContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>عودة</Text>
          <SvgXml xml={svgs.right} width="12" height="12" />
        </TouchableOpacity>
      </View>
    </AppBlur>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 50,
    marginBottom: 24,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(38, 43, 51, .5)',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    flexDirection: 'row',
  },
  flexContainer: {
    flex: 1,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexGrow: 2,
  },
  insetShadowContent: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: Colors.NEUTRALS,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `4px 4px 13.6px 0px ${Colors.SHADOW} inset`,
  },
  createSessionText: {
    color: Colors.PRIMARY_600,
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
    textAlign: 'center',
  },
  flexEndContainer: {
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    backgroundColor: Colors.BACKGROUND_5,
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    borderRadius: 16,
    gap: 4,
    boxShadow: '4px 4px 11.6px 0px #FDF5E91A',
    height: 40,
  },
  backButtonText: {
    color: Colors.BACKGROUND_3,
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
  },
});
