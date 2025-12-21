import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors, fonts } from '@abdlarahman/shared';
import { ReactNode } from 'react';
interface BasicProps {
  onPress: () => void;
  containerStyle?: ViewStyle;
  linearStyle?: ViewStyle;
  textStyles?: TextStyle;
  disabled?: boolean;
  insetShadowContainerStyle?: ViewStyle;
}
interface ChildrenProps extends BasicProps {
  children: ReactNode;
}
interface TextProps extends BasicProps {
  text: string;
}
export default function LinearButton(props: TextProps | ChildrenProps) {
  if (props.disabled)
    return (
      <TouchableOpacity
        disabled={props.disabled}
        style={[
          {
            width: '100%',
          },
          props.disabled && {
            opacity: 0.5,
          },
          props.containerStyle,
        ]}
        onPress={props.onPress}
      >
        <LinearGradient
          style={[styles.linear, props.linearStyle]}
          colors={[Colors.PRIMARY_600, '#FFAF36']}
          start={[0, 0]}
          end={[1, 1]}
        >
          {'children' in props ? (
            props.children
          ) : (
            <Text style={[styles.text, props.textStyles]}>{props.text}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}
    >
      <LinearGradient
        style={[styles.linear, props.linearStyle]}
        colors={[Colors.PRIMARY_600, '#FFAF36']}
        start={[0, 0]}
        end={[1, 1]}
      >
        {'children' in props ? (
          props.children
        ) : (
          <Text style={[styles.text, props.textStyles]}>{props.text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linear: {
    width: '100%',
    borderRadius: 6,
    paddingVertical: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `4px 4px 20.4px 7px rgba(239, 176, 84, 0.25)`,
  },
  text: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: fonts.almaraiBold,
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
