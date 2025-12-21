import { StyleSheet } from 'react-native';
import { Colors, fonts } from '@abdlarahman/shared';

// Common shadow and container styles used throughout the app
export const textStyles = StyleSheet.create({
  text: {
    color: Colors.PRIMARY_600,
    fontFamily: fonts.almaraiRegular,
  },
  title: {
    fontFamily: fonts.almaraiBold,
    color: Colors.DEFAULT_WHITE,
    fontSize: 14,
    textAlign: 'right',
  },
  fontBold: {
    fontFamily: fonts.almaraiBold,
  },
  colorOrange: {
    color: Colors.PRIMARY_600,
  },
  redColor: {
    color: '#FF4343',
  },
  headerText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiRegular,
    fontSize: 13.76,
  },
  headerTextCenter: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiRegular,
    fontSize: 13.76,
    textAlign: 'center',
  },
});

// Export all styles as a single object for convenience
export const commonStyles = {
  shadow: shadowStyles,
  blur: blurStyles,
  container: containerStyles,
  text: textStyles,
  layout: layoutStyles,
  button: buttonStyles,
};

export default commonStyles;
