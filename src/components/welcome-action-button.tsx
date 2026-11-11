import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
  title: string;
  variant: 'primary' | 'secondary' | 'link';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function WelcomeActionButton({ title, variant, onPress, style }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'link' && styles.link,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'primary' && styles.primaryLabel,
          variant === 'link' && styles.linkLabel,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
    height: 53,
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#203F36',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: '#203F36',
    borderWidth: 1,
  },
  link: {
    backgroundColor: 'transparent',
    marginTop: 48,
  },
  label: {
    color: '#203F36',
    fontSize: 15,
    fontWeight: '400',
  },
  primaryLabel: {
    color: '#FFFFFF',
  },
  linkLabel: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.75,
  },
});
