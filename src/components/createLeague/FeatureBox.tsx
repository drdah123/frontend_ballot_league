import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { icons } from './icons';
import { Colors, fonts, sharedIcons } from '@abdlarahman/shared';

interface FeatureBoxProps {
  img: string;
  title: string;
  description: string;
  diamondValue?: number;
  isActive?: boolean;
  onPress?: () => void;
  onEdit?: () => void;
}

export default function FeatureBox({
  img,
  title,
  description,
  diamondValue,
  onPress,
  onEdit,
  isActive = false,
}: FeatureBoxProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.box}>
        {isActive && (
          <View style={styles.acivateContainer}>
            <View style={{ marginTop: 20 }}>
              <SvgXml xml={icons.activate} />
            </View>
            <Pressable onPress={onEdit}>
              <View style={styles.editButton}>
                <Text
                  style={{
                    color: Colors.PRIMARY_600,
                    fontFamily: fonts.almaraiBold,
                    textAlign: 'center',
                    fontSize: 14,
                    marginTop: 3,
                  }}
                >
                  تعديل
                </Text>
              </View>
            </Pressable>
          </View>
        )}
        <Image
          source={{ uri: img }}
          style={{ width: 80, height: 80, resizeMode: 'contain' }}
        />
        <View style={styles.textsContainer}>
          <Text
            style={{
              color: '#ffff',
              fontFamily: fonts.almaraiBold,
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: '#A5A5A7',
              fontFamily: fonts.almaraiRegular,
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
          <View style={styles.boxButton}>
            {diamondValue && !isActive ? (
              <>
                <SvgXml xml={sharedIcons.diamond} />
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: fonts.almaraiRegular,
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                >
                  {diamondValue}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 143,
    height: 171,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.BACKGROUND_5,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 8,
  },
  boxButton: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 8,
    paddingHorizontal: 38,
  },
  textsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
  },
  acivateContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#4d566679',
    zIndex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    width: 102,
    height: 30,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 8,
    marginTop: 60,
  },
});
