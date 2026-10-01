import BottomBar from '@/components/bottom-bar';
import Header from '@/components/header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import carsData from '../src/data/cars.json';
import { Car, RootStackParamList } from '../types';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAvailableCars } from '../src/services/bookingService';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchResults'>;

export default function SearchResultsScreen({ route, navigation }: Props) {
  const { location, startDate, endDate } = route.params;
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    getAvailableCars(startDate, endDate).then(setCars);
  }, [startDate, endDate]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header/>
      <View style={{flex: 7}}>
      <View style={styles.bar}>
        <Text style={styles.barText}>{location || 'Any location'} · {startDate} → {endDate}</Text>
      </View>

      <FlatList
        style={styles.list}
        data={cars}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={<Text>No cars available for these dates</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('Booking_details', { carId: item.id, startDate, endDate })}
          >
            <View style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.make} {item.model}</Text>
              <Text>{item.year} · {item.color}</Text>
            </View>
            <Text style={styles.price}>{item.pricePerDay} kr</Text>
          </Pressable>
        )}
      />
      </View>
      <BottomBar backButton={true} mapButton={true} profileButton={true}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: 'white' },
  logo: { 
    width: 50, 
    height: 50, 
    backgroundColor: '#D3D3D3', 
    margin: 10 },
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
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 10, backgroundColor: '#B0B0B0', borderRadius: 10 },
  image: { width: 60, height: 60, backgroundColor: '#D3D3D3' },
  title: { fontWeight: 'bold', fontSize: 16 },
  price: { fontSize: 20, fontWeight: 'bold' },
});