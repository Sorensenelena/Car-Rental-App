import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '@/components/bottom-bar';
import ElectricCarResultCard from '@/components/electric-car-result-card';
import { getAvailableCars } from '../src/services/bookingService';
import { Car, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchResults'>;

function formatDate(value: string) {
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

export default function SearchResultsScreen({ route, navigation }: Props) {
  const { location, startDate, endDate } = route.params;
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const rentalDays = getRentalDays(startDate, endDate);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(false);

    getAvailableCars(startDate, endDate)
      .then((availableCars) => {
        if (active) setCars(availableCars);
      })
      .catch(() => {
        if (active) {
          setLoadError(true);
          console.error('Unable to load available cars.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [startDate, endDate]);

  const dateRange = `${formatDate(startDate)}–${formatDate(endDate)} · ${rentalDays} ${
    rentalDays === 1 ? 'day' : 'days'
  }`;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Find your electric</Text>
      </View>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.searchSummary}>
              <Ionicons name="search" size={20} color="#17221F" />
              <View style={styles.searchCopy}>
                <Text style={styles.location} numberOfLines={1}>
                  {location.trim() || 'Any location'}
                </Text>
                <Text style={styles.dateRange}>{dateRange}</Text>
              </View>
              <Ionicons name="options-outline" size={20} color="#17221F" />
            </View>

            <View style={styles.filters}>
              <View style={styles.filterChip}>
                <Ionicons name="options-outline" size={14} color="#263A32" />
                <Text style={styles.filterText}>Filters</Text>
              </View>
              <View style={styles.filterChip}>
                <Text style={styles.filterText}>Price</Text>
              </View>
              <View style={styles.filterChip}>
                <Text style={styles.filterText}>Range</Text>
              </View>
              <Ionicons name="swap-vertical" size={20} color="#263A32" />
            </View>

            <View style={styles.resultsHeading}>
              <Text style={styles.resultCount}>
                {cars.length} electric {cars.length === 1 ? 'car' : 'cars'} nearby
              </Text>
              <Text style={styles.recommended}>Recommended</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {loading ? (
              <ActivityIndicator color="#315E4A" />
            ) : (
              <Text style={styles.emptyText}>
                {loadError
                  ? 'We couldn’t load cars. Please try again.'
                  : 'No cars available for these dates.'}
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <ElectricCarResultCard
            car={item}
            rentalDays={rentalDays}
            onPress={() =>
              navigation.navigate('Booking_details', {
                carId: item.id,
                location,
                startDate,
                endDate,
              })
            }
          />
        )}
      />

      <BottomBar />
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
    height: 62,
    justifyContent: 'center',
  },
  headingTitle: {
    color: '#203F36',
    fontSize: 17,
    fontWeight: '600',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 14,
    paddingHorizontal: 20,
  },
  searchSummary: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 13,
    marginBottom: 13,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  searchCopy: {
    flex: 1,
  },
  location: {
    color: '#263A32',
    fontSize: 14,
  },
  dateRange: {
    color: '#7D8983',
    fontSize: 11,
    marginTop: 4,
  },
  filters: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    alignItems: 'center',
    backgroundColor: '#EDF1E9',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterText: {
    color: '#263A32',
    fontSize: 12,
  },
  resultsHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultCount: {
    color: '#263A32',
    fontSize: 16,
  },
  recommended: {
    color: '#7D8983',
    fontSize: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  emptyText: {
    color: '#7D8983',
    fontSize: 14,
    textAlign: 'center',
  },
});
