import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Car } from '../types';
import carsData from '../src/data/cars.json';

const cars: Car[] = carsData;

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
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={<Text>No cars found</Text>}
        renderItem={({item}) => (
          <View style={[styles.card, !item.isAvailable && styles.unavailable]}>
            <View style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.make} {item.model}</Text>
              <Text>{item.year} · {item.color}</Text>
              {!item.isAvailable && <Text>Unavailable</Text>}
            </View>
            <Text style={styles.price}>{item.pricePerDay} kr</Text>
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
    alignItems: 'center',
    gap: 12,
    padding: 10,
    backgroundColor: '#B0B0B0',
    borderRadius: 10,
  },
  price: { fontSize: 20, fontWeight: 'bold' },
  unavailable: { opacity: 0.4 },
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