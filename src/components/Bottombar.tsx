import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function BottomBar() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.bar}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Ionicons name="cube-outline" size={28} />
      </Pressable>

      <Pressable style={styles.middle} onPress={() => {}}>
        <Ionicons name="cube-outline" size={24} />
        <View style={styles.middleBar} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="cube-outline" size={28} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, backgroundColor: '#E0E0E0' },
  middle: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#B0B0B0', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  middleBar: { width: 50, height: 22, backgroundColor: '#808080', borderRadius: 4 },
});