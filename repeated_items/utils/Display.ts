import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const setHeight = (h: number) => (height / 100) * h;
const setWidth = (w: number) => (width / 100) * w;
const setNumberToPercent = (num: number) => {
  console.log(
    `🚀 ~ file: Display.ts:10 ~ setNumberToPercent ~ (num * 100) / width:`,
    (num * 100) / width
  );
  return (num * 100) / width;
};

export default { setHeight, setWidth, setNumberToPercent };
