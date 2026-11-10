import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '@/components/bottom-bar';

const nearbyCars: { id: number; price: number; left: `${number}%`; top: `${number}%` }[] = [
  { id: 1, price: 400, left: '12%', top: '24%' },
  { id: 2, price: 450, left: '34%', top: '43%' },
  { id: 3, price: 550, left: '72%', top: '34%' },
  { id: 4, price: 425, left: '12%', top: '61%' },
  { id: 5, price: 500, left: '64%', top: '73%' },
];

export default function MapScreen() {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const selectedCar = nearbyCars.find((car) => car.id === selectedCarId);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.heading}>
        <Text style={styles.title}>Cars around you</Text>
      </View>

      <View style={styles.searchSummary}>
        <Ionicons name="search" size={20} color="#17221F" />
        <View style={styles.searchCopy}>
          <Text style={styles.searchLocation}>Nørrebro, Copenhagen</Text>
          <Text style={styles.searchDates}>Find available cars nearby</Text>
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

        {nearbyCars.map((car) => {
          const isSelected = car.id === selectedCarId;

          return (
            <Pressable
              key={car.id}
              accessibilityRole="button"
              accessibilityLabel={`${car.price} DKK per day, nearby car`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => setSelectedCarId(isSelected ? null : car.id)}
              style={[
                styles.carMarker,
                { left: car.left, top: car.top },
                isSelected && styles.selectedCarMarker,
              ]}
            >
              <Text
                style={[
                  styles.markerLabel,
                  isSelected && styles.selectedMarkerLabel,
                ]}
              >
                {car.price} DKK
              </Text>
            </Pressable>
          );
        })}

        {selectedCar && (
          <View style={styles.previewCard}>
            <Image
              source={require('../assets/images/placeholder.png')}
              style={styles.carImage}
              resizeMode="cover"
            />
            <View style={styles.previewContent}>
              <View style={styles.previewTopRow}>
                <Text style={styles.carName}>Volkswagen ID.3</Text>
                <Text style={styles.carPrice}>{selectedCar.price} DKK / day</Text>
              </View>
              <Text style={styles.carMeta}>★ 4.9 · 350 m away</Text>
              <Text style={styles.carSpecs}>ϟ 420 km · Automatic</Text>
              <Text style={styles.totalPrice}>
                {selectedCar.price * 2} DKK total · 2 days
              </Text>
            </View>
          </View>
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
  carImage: {
    backgroundColor: '#D9DFE0',
    borderRadius: 12,
    height: 88,
    width: 116,
  },
  previewContent: {
    flex: 1,
    marginLeft: 12,
  },
  previewTopRow: {
    gap: 3,
  },
  carName: {
    color: '#263A32',
    fontSize: 15,
    fontWeight: '700',
  },
  carPrice: {
    color: '#203F36',
    fontSize: 13,
    marginTop: 5,
  },
  carMeta: {
    color: '#7D8983',
    fontSize: 11,
    marginTop: 5,
  },
  carSpecs: {
    color: '#34433D',
    fontSize: 11,
    marginTop: 4,
  },
  totalPrice: {
    color: '#7D8983',
    fontSize: 11,
    marginTop: 6,
  },
});
