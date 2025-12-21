import { StyleSheet } from 'react-native';
import { Colors, fonts } from '@abdlarahman/shared';

const styles = StyleSheet.create({
  viewContainer: {
    flexGrow: 1,
    // backgroundColor:'#131514',
    position: 'relative',
    overflow: 'visible',
  },
  mainContainer: {
    position: 'relative',
    flex: 1,

    paddingHorizontal: 14,
    overflow: 'visible',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#131514',
    paddingBottom: 80,
  },

  logoContainer: {
    top: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingVertical: 70,
  },

  headerText: {
    fontFamily: fonts.almaraiRegular,
    color: Colors.DEFAULT_WHITE,
    fontSize: 32,
    textTransform: 'capitalize',
    lineHeight: 50,
  },

  innerContainer: {
    margin: 4,
    justifyContent: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pagination: {
    bottom: -10, // Adjust this value to change the vertical position of the pagination dots
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#000000d9',
  },
});

export default styles;
