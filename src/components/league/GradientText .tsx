import { View, TextStyle } from 'react-native';
import {
  Svg,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import IMPORTS from '../../../repeated_items/index';

const Colors = IMPORTS.COLORS;

interface GradientTextProps {
  text: string;
  style?: TextStyle;
}
function GradientText({ text, style }: GradientTextProps) {
  const fontSize = style?.fontSize || 16;
  return (
    <View style={{ width: '100%', height: fontSize }}>
      <Svg width="100%" height={fontSize}>
        <Defs>
          <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FFFCA8" />
            <Stop offset="33%" stopColor={Colors.PRIMARY_600} />
            <Stop offset="67%" stopColor="#FFAF36" />
            <Stop offset="100%" stopColor="#F1DC83" />
          </SvgLinearGradient>
        </Defs>
        <SvgText
          fill="url(#grad)"
          fontSize={fontSize}
          fontFamily={style?.fontFamily}
          x="50%"
          y={fontSize * 0.8}
          textAnchor="middle"
        >
          {text}
        </SvgText>
      </Svg>
    </View>
  );
}

export default GradientText;
