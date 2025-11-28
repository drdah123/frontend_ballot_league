import { BlurView, BlurViewProps } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';

export default function AppBlur({
  style,
  children,
}: {
  style?: BlurViewProps['style'];
  children?: React.ReactNode;
}) {
  return (
    <BlurView
      intensity={Platform.OS === 'ios' ? 8 * 4 : 8.2}
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      style={[
        {
          backgroundColor: 'rgba(38, 43, 51, 0.4)',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {children}
    </BlurView>
  );
}
