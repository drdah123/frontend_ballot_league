import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { SvgXml } from 'react-native-svg';
import DiamondBox from './DiamondBox';
import { fonts, Colors } from '@abdlarahman/ui-components';
import { icons } from './icons';

interface Money {
  visible: boolean;
  onClose: () => void;
}

export default function Money({ visible, onClose }: Money) {
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
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          لا تملك أوراق ذهبية كافية
        </Text>
        <Text
          style={{
            color: '#ffff',
            fontFamily: fonts.almaraiBold,
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          تحتاج إلى 5000 ألماسة!
        </Text>
        <View style={styles.creditButton}>
          <SvgXml xml={icons.dimond} />
          <Text
            style={{
              color: '#ffff',
              fontFamily: fonts.almaraiRegular,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            1478
          </Text>
          <Text
            style={{
              color: '#ffff',
              fontFamily: fonts.almaraiBold,
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            رصيدك:
          </Text>
        </View>
        <View style={styles.boxContainer}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <DiamondBox diamondAmount={550} price="7.99" onPress={onClose} />
            <DiamondBox diamondAmount={550} price="14.99" onPress={onClose} />
          </View>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <DiamondBox diamondAmount={550} price="29.99" onPress={onClose} />
            <DiamondBox diamondAmount={550} price="49.99" onPress={onClose} />
          </View>
        </View>
        <View style={{ marginTop: 28, width: '100%' }}>
          <Pressable onPress={onClose}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
                backgroundColor: '#3B4049',
                borderRadius: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.almaraiBold,
                  color: '#ffff',
                }}
              >
                عودة
              </Text>
            </View>
          </Pressable>
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
    backgroundColor: Colors.BACKGROUND_3,
    width: '80%',
    alignItems: 'center',
  },
  timeOption: {
    padding: 8,
    borderRadius: 8,
    width: '100%',
    alignItems: 'flex-end',
  },
  creditButton: {
    borderRadius: 16,
    flexDirection: 'row',
    gap: 4,
    backgroundColor: Colors.BACKGROUND_5,
    width: 124,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  boxContainer: {
    backgroundColor: Colors.BACKGROUND_4,
    padding: 8,
    flexDirection: 'column',
    gap: 12,
    borderRadius: 16,
    marginTop: 16,
  },
});
