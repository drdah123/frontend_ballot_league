import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItemProps } from './PlayerMenu';
import { fonts, Colors } from '@abdlarahman/shared';

export default function MenuItem({ text, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderRadius: 8,
    backgroundColor: '#39404D',
    paddingHorizontal: 8,
    paddingVertical: 8,
    flex: 1,
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: fonts.almaraiRegular,
    fontSize: 12,
    color: Colors.PRIMARY_600,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});
