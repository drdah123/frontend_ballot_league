import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  Colors,
  fonts,
  LinearButton2,
  backgroundsImages,
  cardsImages,
} from '@abdlarahman/ui-components';
import FeatureCard from './FeatureCard';
import {
  LeagueFeature,
  ModalData,
  SetLeagueHandler,
} from '../../types/components/createLeague';

type FeatureModalProps = {
  isVisible: boolean;
  cupId?: string; // ID of the selected cup
  setLeague: SetLeagueHandler;
  setModalsHandler: () => void;
  setActiveFeatures: React.Dispatch<React.SetStateAction<LeagueFeature[]>>;
} & ModalData;

export default function FeatureModal({
  isVisible,
  setModalsHandler,
  cupId,
  setLeague,
  setActiveFeatures,
  data,
  name,
  _id,
  description,
  img: featureImg,
  diamondValue,
  title,
}: FeatureModalProps) {
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(cupId);
  const img = useMemo(() => {
    if (name === 'cardForm' && current) {
      return cardsImages[current as keyof typeof cardsImages];
    }
    if (name === 'roomBackground' && current) {
      return backgroundsImages[current as keyof typeof backgroundsImages];
    }
    if ((name === 'cup' || name === 'title') && current) {
      const cup = data?.find(
        (item) =>
          // @ts-ignore
          item._id === current
      );
      return typeof cup === 'object' && 'img' in cup ? cup.img : '';
    }
    if (name === 'voiceChat' || name === 'bio') {
      return featureImg;
    }
    return undefined;
  }, [current, name]);
  function confirm() {
    // setIsModalVisible(false);
    setModalsHandler();
    setLeague(name, current);
    setActiveFeatures((prev) => {
      if (prev.some((feature) => feature.name === name)) return prev;
      if (name === 'cup') {
        const cup = data?.find(
          (item) =>
            // @ts-ignore
            item._id === current
        );
        return [
          ...prev,
          {
            name,
            _id,
            description,
            title,
            diamondValue:
              cup && typeof cup === 'object' && 'diamondValue' in cup
                ? cup.diamondValue
                : 0,
            img,
          },
        ] as LeagueFeature[];
      }
      return [
        ...prev,
        {
          name,
          _id,
          description,
          title,
          diamondValue: diamondValue ?? 0,
          img,
        },
      ] as LeagueFeature[];
    });
  }
  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={setModalsHandler}
    >
      <TouchableWithoutFeedback onPress={setModalsHandler}>
        <BlurView
          intensity={12}
          experimentalBlurMethod="dimezisBlurView"
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.BACKGROUND_5,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 16,
          }}
        >
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                fontSize: 14,
                color: '#D9D9D9',
                fontFamily: fonts.almaraiBold,
                textAlign: 'center',
                marginBottom: 8,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#D9D9D9',
                fontFamily: fonts.almaraiRegular,
                textAlign: 'center',
                marginRight: 12,
                marginBottom: 10,
              }}
            >
              {description}
            </Text>
            <View
              style={{
                backgroundColor: Colors.BACKGROUND_4,
                paddingHorizontal: 17.07,
                paddingTop: 8,
                borderRadius: 8,
                paddingBottom: 100,
              }}
            >
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  gap: 8,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {data
                  ? data.map((item) => (
                      <FeatureCard
                        key={typeof item === 'string' ? item : item._id}
                        id={typeof item === 'string' ? item : item._id}
                        img={
                          typeof item !== 'string'
                            ? 'img' in item
                              ? item.img
                              : backgroundsImages[
                                  item.image as keyof typeof backgroundsImages
                                ]
                            : cardsImages[item as keyof typeof cardsImages]
                        }
                        name={name}
                        isSelected={
                          typeof item === 'string'
                            ? item === current
                            : name === 'roomBackground' && 'image' in item
                            ? current === item.image
                            : current === item._id
                        }
                        onSelect={() =>
                          setCurrent(
                            typeof item === 'string'
                              ? item
                              : name === 'roomBackground' && 'image' in item
                              ? item.image
                              : item._id
                          )
                        }
                        diamondValue={
                          typeof item === 'object' &&
                          'diamondValue' in item &&
                          item.diamondValue
                            ? item.diamondValue
                            : undefined
                        }
                      />
                    ))
                  : null}
                {name === 'bio' ? (
                  <>
                    <TextInput
                      placeholder="رسالة الدوري"
                      placeholderTextColor={Colors.BACKGROUND_3}
                      style={{
                        fontFamily: fonts.almaraiRegular,
                        color: Colors.DEFAULT_WHITE,
                        width: '100%',
                        height: '100%',
                        textAlign: 'right',
                      }}
                      value={current}
                      onChangeText={setCurrent}
                      maxLength={150} // Enforce maximum length
                      multiline // Allow multiple lines if needed
                    />
                  </>
                ) : null}
              </View>
            </View>
            {name === 'bio' ? (
              <View
                style={{
                  marginBottom: name === 'bio' ? 200 : 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: '#D9D9D9',
                    fontFamily: fonts.almaraiRegular,
                    textAlign: 'left',
                  }}
                >
                  {current ? current.length : 0}/150
                </Text>
                <View style={{ marginTop: 4 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#D9D9D9',
                      fontFamily: fonts.almaraiRegular,
                      textAlign: 'center',
                    }}
                  >
                    هذه الرسالة ستظهر في مباريات الدوري
                  </Text>
                </View>
              </View>
            ) : null}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.buttons}>
                <LinearButton2
                  text="تأكيد"
                  textStyles={{
                    fontSize: 12,
                    fontFamily: fonts.almaraiBold,
                  }}
                  onPress={confirm}
                  disabled={!current && !cupId}
                  containerStyle={{
                    width: '100%',
                    opacity: !current && !cupId ? 0.5 : 1,
                    marginTop: 8,
                  }}
                  linearStyle={{
                    width: '100%',
                    height: 40,
                    paddingVertical: 0,
                  }}
                  colors={['#EFB054', '#FFAF36']}
                  locations={[0, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setModalsHandler}
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
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  buttons: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  textsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
