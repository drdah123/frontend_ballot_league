import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GiftCard from './GiftCard';
import { Colors, fonts } from '@abdlarahman/shared';

interface GiftSectionProps {
  title?: string;
}

const GiftSection: React.FC<GiftSectionProps> = ({ title = 'إهداء ألماس' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.giftContainer}>
        <View style={styles.giftRow}>
          <GiftCard
            svg={'svgs.d1'}
            text="1,500  ألماسة"
            buttonText="اهداء بـ 19.99 ر.س"
            onPress={() => {}}
          />
          <GiftCard
            svg={'svgs.d1'}
            text="550 ألماسة"
            buttonText="اهداء بـ 7.99 ر.س"
            onPress={() => {}}
          />
        </View>
        <View style={styles.giftRow}>
          <GiftCard
            svg={'svgs.d1'}
            text="12,000 ألماسة"
            buttonText="اهداء بـ 114.99 ر.س"
            onPress={() => {}}
          />
          <GiftCard
            svg={'svgs.d1'}
            text="4,000 ألماسة"
            buttonText="اهداء بـ 49.99 ر.س"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
    flex: 1,
    marginTop: 4,
  },
  title: {
    color: Colors.DEFAULT_WHITE,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: fonts.almaraiBold,
  },
  giftContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.BACKGROUND_4,
    borderRadius: 16,
    flexWrap: 'wrap',
    paddingHorizontal: 10.45,
    paddingTop: 16,
    gap: 12,
  },
  giftRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default GiftSection;
