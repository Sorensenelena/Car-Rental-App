import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, Pressable, View } from 'react-native';

type Props = {
  title: string;
  onBack: () => void;
};

export default function AuthScreenHeader({ title, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onBack}
        style={styles.iconButton}
      >
        <View style={styles.backIcon}>
          <Ionicons name="arrow-back" size={18} color="#17221F" />
        </View>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.trailingSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  iconButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 30,
  },
  backIcon: {
    alignItems: 'center',
    borderColor: '#17221F',
    borderRadius: 6,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  trailingSpacer: {
    width: 30,
  },
  title: {
    color: '#203F36',
    fontSize: 16,
    fontWeight: '600',
  },
});
