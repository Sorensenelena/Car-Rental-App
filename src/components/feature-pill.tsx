import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  text: string;
};

export default function FeaturePill({ text }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="flash-outline" size={14} color="#203F36" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F8F7F1',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 6,
    marginBottom: 25,
    marginLeft: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    color: '#29473D',
    fontSize: 11,
  },
});
