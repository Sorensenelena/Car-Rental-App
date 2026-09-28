import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const cars = Array.from({ length: 10 }, (_, i) => ({ id: String(i) }));

export default function SearchResultsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.logo} />

      <View style={styles.bar}>
        <TextInput style={styles.barInput} placeholder="[Search details]" />
        <View style={styles.icon} />
      </View>

      <View style={styles.bar}>
        <TextInput style={styles.barInput} placeholder="[Filter details]" />
        <View style={styles.icon} />
        <View style={styles.icon} />
      </View>

      <FlatList
        style={styles.list}
        data={cars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={() => (
          <View style={styles.card}>
            <View style={styles.image} />
            <View>
              <Text style={styles.title}>Car title</Text>
              <Text>Short car details</Text>
              <Text>$$$</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomBar}>
        <Pressable style={styles.icon} onPress={() => navigation.goBack()} />
        <Pressable style={styles.mapButton}>
          <Text>Map View</Text>
        </Pressable>
        <View style={styles.icon} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'white' },
  logo: { width: 50, height: 50, backgroundColor: '#D3D3D3', margin: 10 },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  barInput: { flex: 1, paddingVertical: 12 },
  icon: { width: 32, height: 32, backgroundColor: '#B0B0B0', borderRadius: 6 },
  list: { flex: 1, paddingHorizontal: 10 },
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    backgroundColor: '#B0B0B0',
    borderRadius: 10,
  },
  image: { width: 60, height: 60, backgroundColor: '#D3D3D3' },
  title: { fontWeight: 'bold', fontSize: 16 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F0F0F0',
  },
  mapButton: {
    backgroundColor: '#B0B0B0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
});