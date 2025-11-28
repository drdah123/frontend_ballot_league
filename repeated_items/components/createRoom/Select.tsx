import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { JSX, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { svgs } from '../../assets/Svg/svg';
import Colors from '../../constants/Colors';
import fonts from '../../constants/fonts';
import Display from '../../utils/Display';
import sharedIcons from '../../assets/shared/sharedIcons';
import { Select } from '../../types/components/createLeague';

export default function SelectRoom({
  selectedValue,
  setSelectedValue,
  data,
  placeholder,
  setSelected,
  BasicButton,
}: {
  BasicButton?: React.FC<{
    onPress: () => void;
  }>;
  selectedValue: string;
  placeholder: string;
  setSelectedValue?: (f: string) => void;
  data: { label: string; value: string }[];
  setSelected?: React.Dispatch<React.SetStateAction<Select>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = data.find((item) => item.value === selectedValue);

  const handleSelect = (data: { label: string; value: string }) => {
    if (setSelected) setSelected(data);
    else if (setSelectedValue) setSelectedValue(data.value);
    setIsOpen(false);
  };
  return (
    <>
      {BasicButton ? (
        <BasicButton onPress={() => setIsOpen(true)} />
      ) : (
        <TouchableOpacity
          style={[
            selectStyles.container,
            {
              backgroundColor: Colors.BACKGROUND_5,
              borderRadius: 4,
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 4,
            },
          ]}
          onPress={() => setIsOpen(true)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {selectedItem &&
            (selectedItem.value === 'free' ||
              selectedItem.value === 'limited' ||
              selectedItem.value === '1m' ||
              selectedItem.value === '30s' ||
              selectedItem.value === '10s' ||
              selectedItem.value === '5s') ? (
              <SvgXml
                xml={
                  selectedItem.value === 'free'
                    ? sharedIcons.free_play
                    : selectedItem.value === 'limited'
                    ? sharedIcons.limited_play
                    : selectedItem.value === '5s'
                    ? sharedIcons.play_speed_5
                    : selectedItem.value === '10s'
                    ? sharedIcons.play_speed_10
                    : selectedItem.value === '30s'
                    ? sharedIcons.play_speed_30
                    : sharedIcons.play_speed_60
                }
                width="24"
                height="24"
                style={{ marginLeft: 8 }}
              />
            ) : null}
            <Text
              style={{
                color: Colors.DEFAULT_WHITE,
                fontFamily: fonts.almaraiBold,
                fontSize: 12,
                flex: 1,
              }}
            >
              {selectedItem ? selectedItem.label : placeholder}
            </Text>
          </View>
          <SvgXml xml={svgs.down} width="36" height="36" />
        </TouchableOpacity>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={selectStyles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              selectStyles.modalContent,
              {
                backgroundColor: Colors.BACKGROUND_5,
                borderRadius: 8,
                width: Display.setWidth(100),
              },
            ]}
          >
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    selectStyles.item,
                    {
                      paddingVertical: 8,
                      paddingHorizontal: 50,
                      borderBottomWidth: index === data.length - 1 ? 0 : 1,
                      borderBottomColor: Colors.BACKGROUND_4,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      paddingBottom: index === data.length - 1 ? 16 : 8,
                    },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <View style={{ flex: 1 }} />
                  <Text
                    style={{
                      color:
                        selectedValue === item.value
                          ? Colors.PRIMARY_600
                          : Colors.DEFAULT_WHITE,
                      fontFamily: fonts.almaraiRegular,
                      fontSize: 18,
                    }}
                  >
                    {item.label}
                  </Text>
                  {item.value === 'free' ||
                  item.value === 'limited' ||
                  item.value === '1m' ||
                  item.value === '30s' ||
                  item.value === '10s' ||
                  item.value === '5s' ? (
                    <SvgXml
                      xml={
                        item.value === 'free'
                          ? sharedIcons.free_play
                          : item.value === 'limited'
                          ? sharedIcons.limited_play
                          : item.value === '5s'
                          ? sharedIcons.play_speed_5
                          : item.value === '10s'
                          ? sharedIcons.play_speed_10
                          : item.value === '30s'
                          ? sharedIcons.play_speed_30
                          : sharedIcons.play_speed_60
                      }
                      width="24"
                      height="24"
                      style={{ marginLeft: 8 }}
                    />
                  ) : null}
                  {selectedValue === item.value && (
                    <SvgXml
                      style={{ position: 'absolute', right: 16 }}
                      xml={svgs.mark}
                      width="24"
                      height="24"
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const selectStyles = StyleSheet.create({
  container: {
    // Container styles will be applied inline
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    // Modal content styles will be applied inline
  },
  item: {
    // Item styles will be applied inline
  },
});
