import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Display, fonts, AppBlur } from '@abdlarahman/ui-components';

const { setWidth, setHeight } = Display;

export default function CreateLeagueButton({
  type,
}: {
  type: 'public' | 'private';
}) {
  const router = useRouter();
  return (
    <AppBlur
      style={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: setWidth(100),
        position: 'absolute',
        bottom: setHeight(12),
        padding: 8,
        paddingBottom: 20,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          padding: 8,
          borderRadius: 16,
          backgroundColor: Colors.BACKGROUND_5,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.PRIMARY_600,
            borderRadius: 12,
            paddingVertical: 10,
          }}
          onPress={() => {
            router.push({
              pathname: 'CreateLeague',
              params: {
                type,
              },
            });
          }}
        >
          <Text
            style={{
              color: Colors.DEFAULT_WHITE,
              fontSize: 16,
              fontFamily: fonts.almaraiRegular,
            }}
          >
            انشاء دوري {type === 'public' ? 'عام' : 'خاص'}
          </Text>
        </TouchableOpacity>
      </View>
    </AppBlur>
  );
}
