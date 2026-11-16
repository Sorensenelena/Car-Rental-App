import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingProgress from '@/components/booking-progress';
import BottomBar from '@/components/bottom-bar';
import carsData from '../src/data/cars.json';
import { Car, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingSummary'>;

const cars = carsData as Car[];

function formatLongDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getRentalDays(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const duration = Math.ceil((end.getTime() - start.getTime()) / 86400000);
  return Number.isFinite(duration) && duration > 0 ? duration : 1;
}

export default function BookingSummaryScreen({ route, navigation }: Props) {
  const { carId, startDate, endDate, location } = route.params;
  const pickupLocation = location?.trim() ?? '';
  const car = cars.find((item) => item.id === carId);
  const rentalDays = getRentalDays(startDate, endDate);
  const rentalTotal = (car?.pricePerDay ?? 0) * rentalDays;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Your booking</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BookingProgress activeStep={1} />

        {car ? (
          <>
            <Text style={styles.title}>The good details.</Text>
            <Text style={styles.subtitle}>One last look before we make it yours.</Text>

            <View style={styles.summaryCard}>
              <View style={styles.carRow}>
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.carImage}
                  resizeMode="cover"
                />
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{car.make} {car.model}</Text>
                  <Text style={styles.carSubtitle}>{car.year} · {car.color}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="flash" size={13} color="#315E4A" />
                    <Text style={styles.carMeta}>Electric car</Text>
                  </View>
                </View>
              </View>

              <View style={styles.dateRow}>
                <View style={styles.dateColumn}>
                  <Text style={styles.dateLabel}>PICKUP</Text>
                  <Text style={styles.dateValue}>{formatLongDate(startDate)}</Text>
                </View>
                <View style={styles.dateColumn}>
                  <Text style={styles.dateLabel}>RETURN</Text>
                  <Text style={styles.dateValue}>{formatLongDate(endDate)}</Text>
                  <Text style={styles.dateDuration}>
                    {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
                  </Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={20} color="#263A32" />
                <View style={styles.locationCopy}>
                  <Text style={styles.locationName}>
                  {pickupLocation || 'Location to be confirmed'}
                  </Text>
                {pickupLocation !== '' && (
                    <Text style={styles.locationHint}>Pickup location</Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.priceSection}>
              <PriceRow
                label={`${car.pricePerDay} DKK × ${rentalDays} ${rentalDays === 1 ? 'day' : 'days'}`}
                value={`${rentalTotal.toLocaleString('en-GB')} DKK`}
              />
              <View style={styles.separator} />
              <PriceRow
                label="Total"
                value={`${rentalTotal.toLocaleString('en-GB')} DKK`}
                emphasized
              />
              <Text style={styles.priceDisclaimer}>
                This total reflects the rental price available in the current listing.
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate('BookingPayment', route.params)}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continue to payment</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.missingCar}>
            <Ionicons name="car-outline" size={38} color="#7D8983" />
            <Text style={styles.missingTitle}>Booking details unavailable</Text>
            <Text style={styles.missingCopy}>
              Go back and select a car from your search results.
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
}

function PriceRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <View style={styles.priceRow}>
      <Text style={[styles.priceLabel, emphasized && styles.totalLabel]}>{label}</Text>
      <Text style={[styles.priceValue, emphasized && styles.totalValue]}>{value}</Text>
    </View>
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
  content: {
    flexGrow: 1,
    paddingBottom: 18,
    paddingHorizontal: 24,
  },
  title: {
    color: '#263A32',
    fontSize: 27,
    fontWeight: '400',
    marginTop: 1,
  },
  subtitle: {
    color: '#7D8983',
    fontSize: 13,
    marginBottom: 14,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 19,
    borderWidth: 1,
    padding: 13,
  },
  carRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  carImage: {
    backgroundColor: '#DDE2E2',
    borderRadius: 12,
    height: 72,
    width: 100,
  },
  carInfo: {
    flex: 1,
    gap: 5,
  },
  carName: {
    color: '#263A32',
    fontSize: 16,
    fontWeight: '600',
  },
  carSubtitle: {
    color: '#7D8983',
    fontSize: 12,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  carMeta: {
    color: '#34433D',
    fontSize: 11,
  },
  dateRow: {
    borderBottomColor: '#E1E5DE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E1E5DE',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 12,
    marginTop: 13,
    paddingVertical: 11,
  },
  dateColumn: {
    flex: 1,
    gap: 4,
  },
  dateLabel: {
    color: '#7D8983',
    fontSize: 10,
  },
  dateValue: {
    color: '#34433D',
    fontSize: 12,
  },
  dateDuration: {
    color: '#34433D',
    fontSize: 12,
  },
  locationRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
    paddingTop: 11,
  },
  locationCopy: {
    flex: 1,
    gap: 3,
  },
  locationName: {
    color: '#34433D',
    fontSize: 13,
  },
  locationHint: {
    color: '#7D8983',
    fontSize: 11,
  },
  priceSection: {
    marginTop: 14,
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  priceLabel: {
    color: '#7D8983',
    flex: 1,
    fontSize: 13,
  },
  priceValue: {
    color: '#34433D',
    fontSize: 13,
    fontWeight: '500',
  },
  separator: {
    backgroundColor: '#DDE2DA',
    height: StyleSheet.hairlineWidth,
    marginTop: 3,
  },
  totalLabel: {
    color: '#263A32',
    fontSize: 16,
  },
  totalValue: {
    color: '#263A32',
    fontSize: 18,
    fontWeight: '700',
  },
  priceDisclaimer: {
    color: '#7D8983',
    fontSize: 10,
    lineHeight: 14,
    marginTop: 7,
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: '#203F36',
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 13,
    minHeight: 52,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  missingCar: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  missingTitle: {
    color: '#263A32',
    fontSize: 18,
    fontWeight: '600',
  },
  missingCopy: {
    color: '#7D8983',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
});
