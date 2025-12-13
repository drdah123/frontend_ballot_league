import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import FeatureBox from './FeatureBox';
import { fonts, Colors, Display } from '@abdlarahman/shared';
import { icons } from './icons';
import { CreateLeagueInput } from '../../types/league';
import { LeagueFeature, ModalKeys } from '../../types/components/createLeague';

interface FeaturesProps {
  league: CreateLeagueInput;
  setModalsHandler: (key: ModalKeys, value: boolean) => void;
  onClose: () => void;
  setSelectedActiveFeatureHandler: (feature: LeagueFeature) => void;
  visible: boolean;
  features: LeagueFeature[];
}

export default function Features({
  league,
  onClose,
  setModalsHandler,
  setSelectedActiveFeatureHandler,
  visible,
  features,
}: FeaturesProps) {
  if (!visible) return null;
  return (
    <View
      style={{
        width: Display.setWidth(100),
        height: Display.setHeight(100),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 1,
      }}
    >
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <BlurView
          intensity={12}
          blurReductionFactor={10}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={[StyleSheet.absoluteFill]}
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
          إضافة مزايا للدوري
        </Text>

        <View style={styles.WinerContainer}>
          <ScrollView
            style={{
              paddingBottom: 4,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {features.map((feature, index) => (
                <FeatureBox
                  key={index}
                  img={feature.img}
                  title={feature.title}
                  description={feature.description}
                  diamondValue={feature.diamondValue}
                  isActive={
                    league[feature.name as keyof CreateLeagueInput]
                      ? true
                      : false
                  }
                  onPress={() => {
                    setModalsHandler(
                      (feature.name + 'Modal') as ModalKeys,
                      true
                    );
                  }}
                  onEdit={() =>
                    setSelectedActiveFeatureHandler({
                      img: feature.img,
                      title: feature.title,
                      description: feature.description,
                      name: feature.name,
                      diamondValue: feature.diamondValue,
                      _id: feature._id,
                    })
                  }
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 28,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity style={{ width: '100%' }} onPress={onClose}>
            <View
              style={{
                width: '100%',
                backgroundColor: Colors.BACKGROUND_4,
                borderRadius: 8,
                paddingVertical: 12,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontFamily: fonts.almaraiBold,
                  textAlign: 'center',
                  fontSize: 14,
                }}
              >
                عودة
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const featureData: {
  iconXml: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  modalKey: ModalKeys;
  leagueKey:
    | 'cup'
    | 'roomBackground'
    | 'cardForm'
    | 'bio'
    | 'voiceChat'
    | 'title';
}[] = [
  {
    iconXml: icons.cup,
    title: 'كأس البطولة',
    subtitle: 'اختر كأس البطولة',
    modalKey: 'cupModal',
    leagueKey: 'cup',
  },
  {
    iconXml: icons.chair,
    title: 'خلفية الجلسة',
    subtitle: 'فعل خلفية الجلسة للاعبين',
    buttonText: '2000',
    modalKey: 'roomBackgroundModal',
    leagueKey: 'roomBackground',
  },
  {
    iconXml: icons.baner,
    title: 'لقب محدد',
    subtitle: 'الالقاب المسموح المشاركة بها',
    buttonText: '2000',
    modalKey: 'titleModal',
    leagueKey: 'title',
  },
  // {
  //   iconXml: icons.winer,
  //   title: 'احتفال بالفوز',
  //   subtitle: 'احتفل بفريقك المفضل',
  //   buttonText: '2000',
  //   modal: 'winerModal',
  // },
  {
    iconXml: icons.cards2,
    title: 'تصاميم الورق',
    subtitle: 'حدد تصاميم ورق الدوري',
    buttonText: '2000',
    modalKey: 'cardFormModal',
    leagueKey: 'cardForm',
  },
  {
    iconXml: icons.letter,
    title: 'رسالة الدوري',
    subtitle: 'اكتب رسالتك لتظهر للجميع',
    buttonText: '2000',
    modalKey: 'messageModal',
    leagueKey: 'bio',
  },
  {
    iconXml: icons.message,
    title: 'دردشة صوتية',
    subtitle: 'فعل الدردشة الصوتية للاعبين',
    buttonText: '2000',
    modalKey: 'voiceChatModal',
    leagueKey: 'voiceChat',
  },
];

const styles = StyleSheet.create({
  timeSetContainer: {
    flexDirection: 'column',
    padding: 16,
    paddingBottom: 0,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_5,
    width: '100%',
    height: '80%',
    marginTop: 110,
  },
  WinerContainer: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24.5,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 8,
    marginTop: 4,
    paddingVertical: 8,
    height: '80%',
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  textsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
  },
});
