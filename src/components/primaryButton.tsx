import { Pressable, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ title, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#404040',
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 15,
    alignItems: 'center',
  },
  text: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});