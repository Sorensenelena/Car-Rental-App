import { Ionicons } from '@expo/vector-icons';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function BrandMark({ style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="flash-outline" size={25} color="#203F36" />
      <Text style={styles.name}>løv</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 26,
  },
  name: {
    color: '#203F36',
    fontSize: 27,
    fontWeight: '500',
    letterSpacing: -1,
  },
});
