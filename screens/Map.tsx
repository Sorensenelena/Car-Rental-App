import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '@/components/bottom-bar';
import { getAvailableCars } from '../src/services/bookingService';
import { Car, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

const markerPositions: { left: `${number}%`; top: `${number}%` }[] = [
  { left: '12%', top: '24%' },
  { left: '34%', top: '43%' },
  { left: '72%', top: '34%' },
  { left: '12%', top: '61%' },
  { left: '64%', top: '73%' },
  { left: '78%', top: '57%' },
  { left: '43%', top: '19%' },
  { left: '48%', top: '82%' },
];

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDefaultDates() {
  const start = new Date();
  const end = new Date(start);
  end.setDate(start.getDate() + 2);
  return { startDate: toDateValue(start), endDate: toDateValue(end) };
}

function formatShortDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

function getRentalDays(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const duration = Math.ceil((end.getTime() - start.getTime()) / 86400000);
  return Number.isFinite(duration) && duration > 0 ? duration : 1;
}

export default function MapScreen({ route, navigation }: Props) {
  const [defaultDates] = useState(getDefaultDates);
  const startDate = route.params?.startDate ?? defaultDates.startDate;
  const endDate = route.params?.endDate ?? defaultDates.endDate;
  const location = route.params?.location?.trim() || 'Nørrebro, Copenhagen';
  const rentalDays = getRentalDays(startDate, endDate);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const selectedCar = cars.find((car) => car.id === selectedCarId);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(false);
    setSelectedCarId(null);

    getAvailableCars(startDate, endDate)
      .then((availableCars) => {
        if (active) setCars(availableCars);
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(true);
          console.error('Unable to load available map cars.', error);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [startDate, endDate]);

  const openCarDetails = (car: Car) => {
    navigation.navigate('Booking_details', {
      carId: car.id,
      location,
      startDate,
      endDate,
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.heading}>
        <Text style={styles.title}>Cars around you</Text>
      </View>

      <View style={styles.searchSummary}>
        <Ionicons name="search" size={20} color="#17221F" />
        <View style={styles.searchCopy}>
          <Text style={styles.searchLocation} numberOfLines={1}>{location}</Text>
          <Text style={styles.searchDates}>
            {formatShortDate(startDate)}–{formatShortDate(endDate)} · {rentalDays}{' '}
            {rentalDays === 1 ? 'day' : 'days'}
          </Text>
        </View>
        <Ionicons name="options-outline" size={21} color="#17221F" />
      </View>

      <View style={styles.map}>
        <View style={[styles.park, styles.parkNorth]} />
        <View style={[styles.park, styles.parkSouth]} />
        <View style={[styles.park, styles.parkWest]} />
        <View style={[styles.waterway, styles.waterwayMain]} />
        <View style={[styles.road, styles.roadOne]} />
        <View style={[styles.road, styles.roadTwo]} />
        <View style={[styles.road, styles.roadThree]} />
        <View style={[styles.road, styles.roadFour]} />
        <View style={[styles.road, styles.roadFive]} />
        <View style={[styles.road, styles.roadSix]} />
        <View style={[styles.road, styles.roadSeven]} />
        <View style={[styles.road, styles.roadEight]} />

        <Text style={[styles.neighborhood, styles.northLabel]}>NØRREBRO</Text>
        <Text style={[styles.neighborhood, styles.southLabel]}>INDRE BY</Text>
        <Text style={[styles.streetLabel, styles.streetOne]}>Nørrebrogade</Text>
        <Text style={[styles.streetLabel, styles.streetTwo]}>Sølvgade</Text>

        <View style={styles.currentLocation}>
          <View style={styles.currentLocationDot} />
        </View>

        {cars.map((car, index) => {
          const isSelected = car.id === selectedCarId;
          const position = markerPositions[index % markerPositions.length];

          return (
            <Pressable
              key={car.id}
              accessibilityRole="button"
              accessibilityLabel={`${car.pricePerDay} DKK per day, ${car.make} ${car.model}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => setSelectedCarId(isSelected ? null : car.id)}
              style={[
                styles.carMarker,
                position,
                isSelected && styles.selectedCarMarker,
              ]}
            >
              <Text style={[styles.markerLabel, isSelected && styles.selectedMarkerLabel]}>
                {car.pricePerDay} DKK
              </Text>
            </Pressable>
          );
        })}

        {loading && (
          <View style={styles.messageCard}>
            <ActivityIndicator color="#315E4A" />
            <Text style={styles.messageText}>Finding available cars…</Text>
          </View>
        )}
        {!loading && loadError && (
          <View style={styles.messageCard}>
            <Text style={styles.messageText}>Cars couldn’t be loaded. Please try again.</Text>
          </View>
        )}
        {!loading && !loadError && cars.length === 0 && (
          <View style={styles.messageCard}>
            <Text style={styles.messageText}>No cars available for these dates.</Text>
          </View>
        )}

        {selectedCar && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`View ${selectedCar.make} ${selectedCar.model} details`}
            onPress={() => openCarDetails(selectedCar)}
            style={({ pressed }) => [styles.previewCard, pressed && styles.previewPressed]}
          >
            <Image
              source={require('../assets/images/placeholder.png')}
              style={styles.carImage}
              resizeMode="cover"
            />
            <View style={styles.previewContent}>
              <Text style={styles.carName} numberOfLines={1}>
                {selectedCar.make} {selectedCar.model}
              </Text>
              <Text style={styles.carMeta}>
                {selectedCar.year} · {selectedCar.color} · Available
              </Text>
              <View style={styles.previewBottomRow}>
                <Text style={styles.totalPrice}>
                  {selectedCar.pricePerDay * rentalDays} DKK total · {rentalDays}{' '}
                  {rentalDays === 1 ? 'day' : 'days'}
                </Text>
                <Text style={styles.carPrice}>{selectedCar.pricePerDay} DKK / day</Text>
              </View>
              <Text style={styles.viewDetails}>View car details →</Text>
            </View>
          </Pressable>
        )}
      </View>

      <BottomBar activeTab="map" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F7F1',
    flex: 1,
  },
  heading: {
    alignItems: 'center',
    height: 57,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#203F36',
    fontSize: 17,
    fontWeight: '600',
  },
  searchSummary: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 15,
    marginTop: 16,
    paddingHorizontal: 15,
    paddingVertical: 13,
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.08)',
  },
  searchCopy: {
    flex: 1,
  },
  searchLocation: {
    color: '#25332F',
    fontSize: 14,
  },
  searchDates: {
    color: '#818B86',
    fontSize: 11,
    marginTop: 3,
  },
  map: {
    backgroundColor: '#E8ECE4',
    flex: 1,
    marginTop: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  park: {
    backgroundColor: '#D5E4CE',
    borderRadius: 55,
    position: 'absolute',
  },
  parkNorth: {
    height: '32%',
    right: '-13%',
    top: '6%',
    width: '43%',
  },
  parkSouth: {
    height: '27%',
    left: '6%',
    top: '39%',
    width: '28%',
  },
  parkWest: {
    height: '18%',
    left: '-10%',
    top: '76%',
    width: '40%',
  },
  waterway: {
    backgroundColor: '#C8DFE3',
    position: 'absolute',
  },
  waterwayMain: {
    height: '125%',
    left: '52%',
    top: '-11%',
    transform: [{ rotate: '23deg' }],
    width: 26,
  },
  road: {
    backgroundColor: '#FFFFFF',
    height: 8,
    position: 'absolute',
    width: '130%',
  },
  roadOne: {
    left: '-14%',
    top: '34%',
    transform: [{ rotate: '31deg' }],
  },
  roadTwo: {
    left: '-12%',
    top: '51%',
    transform: [{ rotate: '-22deg' }],
  },
  roadThree: {
    left: '-18%',
    top: '67%',
    transform: [{ rotate: '14deg' }],
  },
  roadFour: {
    left: '-10%',
    top: '82%',
    transform: [{ rotate: '-29deg' }],
  },
  roadFive: {
    height: '120%',
    left: '17%',
    top: '-9%',
    transform: [{ rotate: '15deg' }],
    width: 8,
  },
  roadSix: {
    height: '120%',
    left: '39%',
    top: '-10%',
    transform: [{ rotate: '-13deg' }],
    width: 8,
  },
  roadSeven: {
    height: '120%',
    left: '73%',
    top: '-9%',
    transform: [{ rotate: '17deg' }],
    width: 8,
  },
  roadEight: {
    left: '-15%',
    top: '25%',
    transform: [{ rotate: '-8deg' }],
  },
  neighborhood: {
    color: '#8B998B',
    fontSize: 13,
    letterSpacing: 1.5,
    position: 'absolute',
  },
  northLabel: {
    left: '10%',
    top: '18%',
  },
  southLabel: {
    right: '10%',
    top: '55%',
  },
  streetLabel: {
    color: '#9AA39B',
    fontSize: 9,
    position: 'absolute',
  },
  streetOne: {
    left: '16%',
    top: '58%',
    transform: [{ rotate: '27deg' }],
  },
  streetTwo: {
    right: '20%',
    top: '24%',
    transform: [{ rotate: '-71deg' }],
  },
  currentLocation: {
    alignItems: 'center',
    backgroundColor: 'rgba(32, 63, 54, 0.12)',
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    left: '53%',
    position: 'absolute',
    top: '55%',
    width: 38,
  },
  currentLocationDot: {
    backgroundColor: '#203F36',
    borderColor: '#FFFFFF',
    borderRadius: 7,
    borderWidth: 3,
    height: 14,
    width: 14,
  },
  carMarker: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: 13,
    position: 'absolute',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.14)',
  },
  selectedCarMarker: {
    backgroundColor: '#203F36',
  },
  markerLabel: {
    color: '#263A32',
    fontSize: 13,
    fontWeight: '700',
  },
  selectedMarkerLabel: {
    color: '#FFFFFF',
  },
  messageCard: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    left: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    position: 'absolute',
    right: 18,
    top: '44%',
  },
  messageText: {
    color: '#34433D',
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  previewCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    bottom: 14,
    flexDirection: 'row',
    left: 15,
    padding: 12,
    position: 'absolute',
    right: 15,
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.12)',
  },
  previewPressed: {
    opacity: 0.84,
  },
  carImage: {
    backgroundColor: '#DDE2E2',
    borderRadius: 12,
    height: 88,
    width: 116,
  },
  previewContent: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },
  carName: {
    color: '#263A32',
    fontSize: 15,
    fontWeight: '700',
  },
  carMeta: {
    color: '#7D8983',
    fontSize: 10,
    marginTop: 5,
  },
  previewBottomRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 7,
  },
  carPrice: {
    color: '#263A32',
    fontSize: 12,
    fontWeight: '700',
  },
  totalPrice: {
    color: '#7D8983',
    flex: 1,
    fontSize: 10,
  },
  viewDetails: {
    color: '#315E4A',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
});
