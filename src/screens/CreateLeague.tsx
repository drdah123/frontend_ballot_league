import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { SvgXml } from 'react-native-svg';
import LeagueSettingsModal from '../components/createLeague/LeagueSettingsModal';
import TimeSet from '../components/createLeague/TimeSet';
import SessionSettings from '../components/createLeague/SessionSettings';
import WinnerAward from '../components/createLeague/WinnerAward';
import Features from '../components/createLeague/Features';
import Money from '../components/createLeague/Money';
import LeagueSettingsModal2 from '../components/createLeague/LeagueSettingsModal2';
import { icons } from '../components/createLeague/icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { CreateLeagueInput, Cup, LeagueType } from '../types/league';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_LEAGUE,
  GET_CUPS,
  GET_FEATURES,
  GET_TITLES,
} from '../schema/league';
import type { UserDataType } from '@abdlarahman/ui-components';
import FeatureModal from '../components/createLeague/FeatureModal';
import AlertFeature from '../components/createLeague/AlertFeature';
// import { useSelector } from 'react-redux'; // Should be passed as prop
// import { useToast } from 'react-native-toast-notifications'; // Should be added to dependencies

// Type definitions that should be passed from parent or defined locally
type Title = any; // Achievement type
type RoomBackgroundType = any;
import {
  LeagueFeature,
  ModalData,
  ModalKeys,
  SetLeagueHandler,
} from '../types/components/createLeague';
import VoiceChatModal from '../components/createLeague/VoiceChatModal';
import {
  AppBlur,
  Colors,
  fonts,
  Images,
  LinearButton2,
  cardsImages,
  backgroundsImages,
  TwoCards,
  changeLevelsToAR,
  Header,
  sharedIcons,
  getGraphQLErrors,
} from '@abdlarahman/ui-components';
import { ToastType } from 'react-native-toast-notifications';
export default function CreateLeague({
  user,
  toast,
}: {
  user: UserDataType;
  toast?: ToastType;
}) {
  const router = useRouter();
  const { data: cupsData, loading } = useQuery<{ getCups: Cup[] }>(GET_CUPS); // Placeholder for any GraphQL queries if needed

  const { data } = useQuery<{
    getTitles: Title[];
  }>(GET_TITLES);
  // Note: ROOM_BACKGROUNDS query needs to be defined in schema/league.ts
  const roomBackgrounds: { roomBackgrounds?: RoomBackgroundType[] } = {
    roomBackgrounds: undefined,
  };
  const [createLeague, { error }] = useMutation<
    { createLeague: LeagueType },
    { input: CreateLeagueInput }
  >(CREATE_LEAGUE, {
    onError(err) {
      getGraphQLErrors(err, 'CREATE_LEAGUE');
    },
  });

  const params = useLocalSearchParams<{ type: 'public' | 'private' }>();
  const [modals, setModals] = useState<Record<ModalKeys, boolean>>({
    isModalVisible: false,
    isModal2Visible: false,
    isTimeSetVisible: false,
    isSessionVisible: false,
    isFirstWinnerVisible: false,
    isSecondWinnerVisible: false,
    isMoneyVisible: false,
    isFeaturesVisible: false,
    messageModal: false,
    titleModal: false,
    cupModal: false,
    sessionModal: false,
    cardFormModal: false,
    roomBackgroundModal: false,
    voiceChatModal: false,
  });
  const { data: dataFeatures } = useQuery<{
    getLeagueFeatures: LeagueFeature[];
  }>(GET_FEATURES);
  const features = useMemo(() => {
    if (!dataFeatures) return undefined;
    if (params.type === 'public') {
      return dataFeatures?.getLeagueFeatures.filter(
        (feature) => feature.name !== 'voiceChat'
      );
    }
    return dataFeatures.getLeagueFeatures;
  }, [dataFeatures]);
  const voiceChat = useMemo(
    () =>
      dataFeatures?.getLeagueFeatures.find(
        (feature) => feature.name === 'voiceChat'
      ),
    [dataFeatures]
  );
  const [selectedActiveFeature, setSelectedActiveFeature] =
    useState<LeagueFeature | null>(null);
  const [activeFeatures, setActiveFeatures] = useState<LeagueFeature[]>([]);

  const [league, setLeague] = useState<CreateLeagueInput>({
    name: '',
    description: '',
    type: 'public',
    maxSeats: 16,
    playSpeed: 'normal',
    playType: 'free',
    levelName: 'beginner',
    roundType: 'all_1',
    prizes: {
      winnerPrize: 0,
    },
    cup: undefined,
    title: undefined,
    roomBackground: undefined,
    voiceChat: undefined,
    bio: undefined,
    cardForm: undefined,
    startTime: 'instant',
  });
  const totalPrice = useMemo(
    () =>
      activeFeatures.reduce((acc, feature) => acc + feature.diamondValue, 0) +
      league.prizes.winnerPrize +
      (league.prizes.secondWinnerPrize || 0),
    [activeFeatures, league.prizes.winnerPrize, league.prizes.secondWinnerPrize]
  );
  const changePlaySpeedIcon = useMemo(() => {
    return sharedIcons[
      `play_speed_${
        league.playSpeed === 'normal'
          ? '10'
          : league.playSpeed === 'slow'
          ? '30'
          : '5'
      }`
    ]
      .replaceAll(`fill="white"`, `fill="#EFB054"`)
      .replace('stroke="white"', 'stroke="#EFB054"');
  }, [league.playSpeed]);
  const changePlayTypeIcon = useMemo(() => {
    return sharedIcons[`${league.playType as 'free'}_play`].replaceAll(
      `fill="white"`,
      `fill="#EFB054"`
    );
  }, [league.playType]);
  const changeMaxSeatsIcon = useMemo(() => {
    return sharedIcons[`chair_${league.maxSeats as 16}`].replaceAll(
      `fill="white"`,
      `fill="#EFB054"`
    );
  }, [league.maxSeats]);
  const changeClockIcon = useMemo(() => {
    if (league.startTime === 'instant' || !league.startTime)
      return sharedIcons.clock.replace(
        'stroke="#FFFDFA"',
        `stroke="${Colors.PRIMARY_700}"`
      );
    return sharedIcons.schedule.replace(
      'fill="#262B33"',
      `fill="${Colors.PRIMARY_700}"`
    );
  }, [league.startTime]);
  const changeRoundTypeIcon = useMemo(() => {
    return sharedIcons[
      `coffee_${league.roundType === 'all_3' ? '3' : '1'}`
    ].replaceAll(`fill="white"`, `fill="#EFB054"`);
  }, [league.roundType]);

  const setLeagueHandler: SetLeagueHandler = useCallback((key, value) => {
    setLeague((prev) => ({ ...prev, [key]: value }));
  }, []);
  const setModalsHandler = useCallback(
    (key: ModalKeys, value: boolean) => {
      setModals((prev) => ({ ...prev, [key]: value }));
    },
    [modals]
  );

  async function createLeagueHandler() {
    if (league.name.length < 3 || league.name.length > 20 || !league.name)
      return toast?.show('يجب أن يكون اسم الدوري بين 3-20 حرفًا', {
        type: 'danger',
      });
    if (league.prizes.winnerPrize <= 0)
      return toast?.show('يجب تحديد جائزة للمركز الأول', { type: 'danger' });
    if (league.prizes.winnerPrize < 1000)
      return toast?.show('يجب أن تكون جائزة المركز الأول 1000 أو أكثر', {
        type: 'danger',
      });
    if (
      league.prizes.secondWinnerPrize &&
      league.prizes.secondWinnerPrize < 1000
    )
      return toast?.show('يجب أن تكون جائزة المركز الثاني 1000 أو أكثر', {
        type: 'danger',
      });
    if (
      league.prizes.secondWinnerPrize &&
      league.prizes.secondWinnerPrize >= league.prizes.winnerPrize
    )
      return toast?.show(
        'يجب أن تكون جائزة المركز الاول أكبر من جائزة المركز الثاني',
        { type: 'danger' }
      );
    if (user.diamond < totalPrice)
      return setModalsHandler('isMoneyVisible', true);

    try {
      const response = await createLeague({ variables: { input: league } });
      console.log(`🚀 ~ createLeagueHandler ~ response:`, response);
      if (response.data?.createLeague) {
        toast?.show('تم إنشاء الدوري بنجاح', { type: 'success' });
        router.push({
          pathname: 'League',
          params: {
            league: JSON.stringify(response.data.createLeague),
          },
        });
      } else {
        toast?.show('فشل إنشاء الدوري', { type: 'danger' });
      }
    } catch (error) {
      console.log(`🚀 ~ createLeagueHandler ~ error:`, error);

      // Get detailed Apollo error information
      if (error instanceof Error) {
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
      }

      // If it's an ApolloError, get more details
      if (error && typeof error === 'object' && 'graphQLErrors' in error) {
        const apolloError = error as any;
        console.log('GraphQL Errors:', apolloError.graphQLErrors);
        console.log('Network Error:', apolloError.networkError);

        // Log specific error details
        if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
          apolloError.graphQLErrors.forEach((gqlError: any, index: number) => {
            console.log(`GraphQL Error ${index + 1}:`, {
              message: gqlError.message,
              locations: gqlError.locations,
              path: gqlError.path,
              extensions: gqlError.extensions,
            });
          });
        }

        if (apolloError.networkError) {
          console.log('Network Error Details:', {
            message: apolloError.networkError.message,
            statusCode: apolloError.networkError.statusCode,
            result: apolloError.networkError.result,
          });
        }
      }

      toast?.show('فشل إنشاء الدوري', { type: 'danger' });
    }
  }
  const modalsData: ModalData[] | undefined = useMemo(() => {
    if (
      dataFeatures?.getLeagueFeatures &&
      cupsData?.getCups &&
      data?.getTitles
    ) {
      return dataFeatures.getLeagueFeatures
        .filter((feature) => feature.name !== 'voiceChat')
        .map((feature) => ({
          _id: feature._id,
          name: feature.name,
          title: feature.title,
          description: feature.description,
          data:
            feature.name === 'cup'
              ? cupsData?.getCups
              : feature.name === 'title'
              ? data?.getTitles
              : feature.name === 'roomBackground'
              ? roomBackgrounds.roomBackgrounds || []
              : feature.name === 'cardForm'
              ? user.skins.cards
              : [],
          img: feature.img,
          diamondValue: feature.diamondValue,
        }));
    }
  }, [cupsData, data, roomBackgrounds, user.skins.cards, features]);
  const setSelectedActiveFeatureHandler = useCallback(
    (feature: LeagueFeature) => {
      if (
        feature &&
        !feature.img &&
        (feature.name === 'cup' || feature.name === 'title') &&
        modalsData
      ) {
        const data = modalsData.find(
          (item) => item.name === feature.name
        )?.data;
        const item = data?.find(
          (item) =>
            typeof item === 'object' && item._id === league[feature.name]
        );
        const img =
          typeof item === 'object' && 'img' in item ? item.img : undefined;
        if (img) {
          feature.img = img;
        }
      }
      setSelectedActiveFeature(feature);
    },
    [league, modalsData]
  );
  return (
    <View style={styl.viewContainer}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ImageBackground
        style={styl.background}
        source={Images.BACKGROUND}
        resizeMode="cover"
        imageStyle={{
          opacity: 0.1,
        }}
      >
        <Header
          name={`إنشاء دوري ${params.type === 'public' ? 'عام' : 'خاص'}`}
        />
        <View
          style={{
            paddingHorizontal: 8,
            marginTop: 10,
            flexDirection: 'column',
            gap: 8,
            flex: 1,
          }}
        >
          <View style={styl.container}>
            <Text
              style={{
                color: Colors.DEFAULT_WHITE,
                fontFamily: fonts.almaraiRegular,
                textAlign: 'right',
                fontSize: 10,
              }}
            >
              اسم الدوري
            </Text>
            <TextInput
              placeholder="اسم الدوري"
              style={styl.inputText}
              placeholderTextColor={'#616671'}
              onChangeText={(text) => setLeagueHandler('name', text)}
              maxLength={15}
            />
            <View style={styl.isideContainer}>
              <View style={styl.cards}>
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 10,
                    textAlign: 'right',
                  }}
                >
                  إعدادات الجلسة
                </Text>
                <Pressable
                  onPress={() => setModalsHandler('isSessionVisible', true)}
                >
                  <View style={styl.controlButtons}>
                    <View style={styl.iconsContainer}>
                      <SvgXml xml={changePlayTypeIcon} />
                    </View>
                    <View style={styl.iconsContainer}>
                      <SvgXml xml={changePlaySpeedIcon} />
                    </View>
                    <View
                      style={{
                        backgroundColor: '#CD7F32',
                        borderRadius: 4,
                        width: 34,
                        height: 19,
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0px 5.72px 7.44px 0px #00000040',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          fontFamily: fonts.almaraiRegular,
                          color: Colors.DEFAULT_WHITE,
                        }}
                      >
                        {changeLevelsToAR(league.levelName)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
              <View style={styl.cards}>
                <Text
                  style={{
                    fontFamily: fonts.almaraiRegular,
                    color: Colors.DEFAULT_WHITE,
                    fontSize: 10,
                    textAlign: 'right',
                  }}
                >
                  إعدادات الدوري
                </Text>
                <Pressable
                  onPress={() => setModalsHandler('isModalVisible', true)}
                >
                  <View style={styl.controlButtons}>
                    <View style={styl.iconsContainer}>
                      <SvgXml xml={changeClockIcon} />
                    </View>
                    <View style={styl.iconsContainer}>
                      <SvgXml xml={changeMaxSeatsIcon} />
                    </View>
                    <View style={styl.iconsContainer}>
                      <SvgXml xml={changeRoundTypeIcon} />
                    </View>
                  </View>
                </Pressable>
              </View>
            </View>
            <View style={styl.addContainer}>
              <Text
                style={{
                  color: Colors.DEFAULT_WHITE,
                  fontFamily: fonts.almaraiRegular,
                  textAlign: 'right',
                  fontSize: 10,
                }}
              >
                جائزة الدوري
              </Text>
              <Pressable>
                {league.prizes.winnerPrize !== 0 ? (
                  <View
                    style={{
                      ...styl.addCards,
                      backgroundColor: Colors.BACKGROUND_3,
                      borderRadius: 5.48,
                      justifyContent: 'space-between',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: '#939599',
                          fontFamily: fonts.almaraiRegular,
                          textAlign: 'right',
                          fontSize: 12,
                        }}
                      >
                        {league.prizes.winnerPrize} جوهرة للمركز الأول
                      </Text>
                      <SvgXml xml={icons.dimond} />
                    </View>
                    <Pressable
                      onPress={() =>
                        setModalsHandler('isFirstWinnerVisible', true)
                      }
                    >
                      <SvgXml xml={icons.edit2} />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() =>
                      setModalsHandler('isFirstWinnerVisible', true)
                    }
                    style={{
                      ...styl.addCards,
                      backgroundColor: Colors.BACKGROUND_3,
                      borderRadius: 5.48,
                    }}
                  >
                    <SvgXml xml={icons.add} />
                    <Text
                      style={{
                        color: '#939599',
                        fontFamily: fonts.almaraiRegular,
                        textAlign: 'right',
                        fontSize: 12,
                      }}
                    >
                      أضف قيمة جائزة المركز الأول
                    </Text>
                    <SvgXml xml={icons.dimond} />
                  </Pressable>
                )}
              </Pressable>
              {league.prizes.secondWinnerPrize &&
              league.prizes.secondWinnerPrize !== 0 ? (
                <View
                  style={{
                    ...styl.addCards,
                    backgroundColor: Colors.BACKGROUND_3,
                    borderRadius: 5.48,
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: '#939599',
                        fontFamily: fonts.almaraiRegular,
                        textAlign: 'right',
                        fontSize: 12,
                      }}
                    >
                      {league.prizes.secondWinnerPrize} جوهرة للمركز الثاني
                    </Text>
                    <SvgXml xml={icons.dimond} />
                  </View>
                  <Pressable
                    onPress={() =>
                      setModalsHandler('isSecondWinnerVisible', true)
                    }
                  >
                    <SvgXml xml={icons.edit2} />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() =>
                    setModalsHandler('isSecondWinnerVisible', true)
                  }
                >
                  <View style={{ ...styl.addCards, borderRadius: 5.48 }}>
                    <SvgXml xml={icons.add} />
                    <Text
                      style={{
                        color: '#939599',
                        fontFamily: fonts.almaraiRegular,
                        textAlign: 'right',
                        fontSize: 12,
                      }}
                    >
                      أضف قيمة جائزة المركز الثاني
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
            <View style={styl.thirdContainer}>
              <View style={styl.addIconeContainer}>
                <Pressable
                  onPress={() => setModalsHandler('isFeaturesVisible', true)}
                >
                  <SvgXml xml={icons.add2} />
                </Pressable>
              </View>
              <View style={styl.textContainer}>
                {activeFeatures.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexDirection: 'row' }}
                    contentContainerStyle={{
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      gap: 24,
                    }}
                  >
                    {activeFeatures.map((feature, index) => (
                      <Pressable
                        key={index}
                        onPress={() => setSelectedActiveFeature(feature)}
                      >
                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                            backgroundColor: Colors.BACKGROUND_5,
                            width: 73,
                            height: 80,
                            borderRadius: 8,
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          <View
                            style={{
                              position: 'absolute',
                              top: -1,
                              right: -1,
                              borderBottomLeftRadius: 6,
                              backgroundColor: '#929292',
                              width: 15,
                              height: 15,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <SvgXml xml={icons.edit} />
                          </View>
                          {/* //!need to implement image source */}
                          {feature.name === 'cardForm' &&
                          league[feature.name] ? (
                            <TwoCards
                              img={
                                league[feature.name] as keyof typeof cardsImages
                              }
                              leftCardStyle={{
                                left: 7.5,
                                bottom: undefined,
                                top: 7,
                              }}
                              imageStyle={{
                                width: 36,
                                height: 48,
                                borderRadius: 2.19,
                              }}
                            />
                          ) : feature.name === 'roomBackground' &&
                            league.roomBackground ? (
                            <Image
                              source={
                                backgroundsImages[
                                  league.roomBackground as keyof typeof backgroundsImages
                                ]
                              }
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 12,
                                resizeMode: 'contain',
                              }}
                            />
                          ) : (
                            <Image
                              source={{
                                uri: feature.img,
                              }}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 12,
                                resizeMode: 'center',
                              }}
                            />
                          )}
                          <Text
                            style={{
                              color: Colors.DEFAULT_WHITE,
                              fontFamily: fonts.almaraiBold,
                              fontSize: 6.63,
                              textAlign: 'center',
                            }}
                          >
                            {feature.title}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                ) : (
                  <Text
                    style={{
                      color: '#939599',
                      fontFamily: fonts.almaraiBold,
                      textAlign: 'right',
                      fontSize: 14,
                    }}
                  >
                    ميز الدوري الخاص بك بإضافات حصرية
                  </Text>
                )}
              </View>
            </View>
            <View style={{ ...styl.thirdContainer }}>
              <View style={styl.box}>
                <View style={styl.box}>
                  <Text
                    style={{
                      color: '#939599',
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 10,
                    }}
                  >
                    ورق الدوري
                  </Text>
                  <View>
                    <TwoCards
                      img={league.cardForm as keyof typeof cardsImages}
                    />
                  </View>
                </View>
              </View>
              <View>
                <View style={styl.box}>
                  <Text
                    style={{
                      color: '#939599',
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 10,
                    }}
                  >
                    خلفية الجلسة
                  </Text>
                  <Image
                    source={
                      backgroundsImages[
                        (league.roomBackground as keyof typeof backgroundsImages) ||
                          'default'
                      ]
                    }
                    style={{
                      width: 77,
                      height: 77,
                      borderRadius: 2.19,
                      resizeMode: 'center',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <AppBlur style={{ ...styl.blurContainer2 }}>
          <View style={{ width: '100%', padding: 10 }}>
            <View
              style={{
                width: '100%',
                padding: 8,
                backgroundColor: Colors.BACKGROUND_5,
                borderRadius: 16,
              }}
            >
              <View style={styl.results}>
                <View style={styl.resultsLine}>
                  <View
                    style={{
                      gap: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <SvgXml xml={icons.dimond} />
                    <Text
                      style={{
                        color: Colors.DEFAULT_WHITE,
                        fontFamily: fonts.almaraiRegular,
                        fontSize: 12,
                      }}
                    >
                      {league.prizes.winnerPrize +
                        (league.prizes.secondWinnerPrize || 0)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#D9D9D9',
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 12,
                    }}
                  >
                    الجوائز
                  </Text>
                </View>
                <View style={styl.resultsLine}>
                  <View
                    style={{
                      gap: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <SvgXml xml={icons.dimond} />
                    <Text
                      style={{
                        color: Colors.DEFAULT_WHITE,
                        fontFamily: fonts.almaraiRegular,
                        fontSize: 12,
                      }}
                    >
                      {totalPrice -
                        (league.prizes.winnerPrize +
                          (league.prizes.secondWinnerPrize || 0))}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#D9D9D9',
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 12,
                    }}
                  >
                    المزايا المضافة
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: Colors.DEFAULT_WHITE,
                    borderRadius: 5.48,
                  }}
                />
                <View style={styl.resultsLine}>
                  <View
                    style={{
                      gap: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <SvgXml xml={icons.dimond} />
                    <Text
                      style={{
                        color: Colors.DEFAULT_WHITE,
                        fontFamily: fonts.almaraiRegular,
                        fontSize: 12,
                      }}
                    >
                      {totalPrice}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: Colors.DEFAULT_WHITE,
                      fontFamily: fonts.almaraiBold,
                      fontSize: 12,
                    }}
                  >
                    مجموع الجواهر المطلوبة
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 8, width: '100%' }}>
                <LinearButton2
                  text="إنشاء دوري"
                  textStyles={{ fontSize: 12, fontFamily: fonts.almaraiBold }}
                  onPress={createLeagueHandler}
                  containerStyle={{
                    width: '100%',
                    height: 40,
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
            </View>
          </View>
        </AppBlur>

        {selectedActiveFeature ? (
          <AlertFeature
            selectedFeature={selectedActiveFeature}
            setActiveFeatures={setActiveFeatures}
            setLeagueHandler={setLeagueHandler}
            setSelectedActiveFeature={setSelectedActiveFeature}
            setModalsHandler={setModalsHandler}
            league={league}
          />
        ) : null}

        <LeagueSettingsModal
          setModalsHandler={setModalsHandler}
          visible={modals.isModalVisible}
          onClose={() => setModalsHandler('isModalVisible', false)}
          league={league}
          setLeague={setLeagueHandler}
          LinearButton2={LinearButton2 as any}
        />
        <TimeSet
          league={league}
          visible={modals.isTimeSetVisible}
          onClose={() => setModalsHandler('isTimeSetVisible', false)}
          onSelectTime={(time) => setLeagueHandler('startTime', time)}
        />
        <SessionSettings
          visible={modals.isSessionVisible}
          onClose={() => setModalsHandler('isSessionVisible', false)}
          league={league}
          setLeague={setLeagueHandler}
        />
        <WinnerAward
          modals={modals}
          setModalsHandler={setModalsHandler}
          league={league}
          setLeague={setLeagueHandler}
        />
        <Features
          league={league}
          visible={modals.isFeaturesVisible}
          onClose={() => setModalsHandler('isFeaturesVisible', false)}
          setModalsHandler={setModalsHandler}
          setSelectedActiveFeatureHandler={setSelectedActiveFeatureHandler}
          features={features || []}
        />
        <Money
          visible={modals.isMoneyVisible}
          onClose={() => setModalsHandler('isMoneyVisible', false)}
        />
        <LeagueSettingsModal2
          visible={modals.isModal2Visible}
          onClose={() => setModalsHandler('isModal2Visible', false)}
        />
        {voiceChat && modals.voiceChatModal ? (
          <VoiceChatModal
            key={voiceChat._id}
            img={voiceChat.img || ''}
            title={voiceChat.title}
            description={voiceChat.description}
            setLeagueHandler={setLeagueHandler}
            setModalsHandler={() => setModalsHandler('voiceChatModal', false)}
          />
        ) : null}
        {features && modalsData
          ? modalsData.map((modal) => (
              <FeatureModal
                key={modal._id}
                isVisible={modals[(modal.name + 'Modal') as ModalKeys]}
                cupId={league.cup}
                setLeague={setLeagueHandler}
                setModalsHandler={() =>
                  setModalsHandler((modal.name + 'Modal') as ModalKeys, false)
                }
                _id={modal._id}
                diamondValue={modal.diamondValue}
                img={modal.img}
                setActiveFeatures={setActiveFeatures}
                data={modal.data}
                title={modal.title}
                description={modal.description}
                name={modal.name}
              />
            ))
          : null}
      </ImageBackground>
    </View>
  );
}

const styl = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: 4,
    borderRadius: 16,
    backgroundColor: Colors.BACKGROUND_4,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 8,
  },
  inputText: {
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 5.48,
    width: '100%',
    height: 38,
    paddingHorizontal: 16,
    paddingTop: 8,
    fontFamily: fonts.almaraiBold,
    color: 'white',
    fontSize: 13,
    textAlign: 'right',
  },
  isideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'right',
    width: '100%',
    marginTop: 8,
  },
  cards: {
    flexDirection: 'column',
    gap: 4,
  },
  controlButtons: {
    flexDirection: 'row-reverse',
    width: 157.5,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 5.48,
    borderColor: Colors.BACKGROUND_3,
    backgroundColor: Colors.BACKGROUND_5,
  },
  iconsContainer: {
    flexDirection: 'row-reverse',
    gap: 2,
    alignItems: 'center',
  },
  addContainer: {
    marginTop: 8,
    flexDirection: 'column',
    gap: 4,
    width: '100%',
  },
  addCards: {
    width: '100%',
    gap: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  thirdContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    gap: 4,
  },
  textContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 90,
    borderRadius: 5.48,
  },
  addIconeContainer: {
    backgroundColor: Colors.BACKGROUND_3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    height: 90,
    borderRadius: 5.48,
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    borderRadius: 5.48,
    width: 161,
    justifyContent: 'flex-start',
    paddingTop: 4,
    backgroundColor: Colors.BACKGROUND_3,
    height: 117,
    flex: 1,
  },
  blurContainer2: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    marginBottom: 20,
  },
  results: {
    backgroundColor: Colors.BACKGROUND_3,
    borderRadius: 5.48,
    width: '100%',
    flexDirection: 'column',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
