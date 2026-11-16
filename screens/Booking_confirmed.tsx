import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
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

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirmed'>;

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

export default function BookingConfirmedScreen({ route }: Props) {
  const { carId, startDate, endDate, location } = route.params;
  const car = cars.find((item) => item.id === carId);
  const pickupLocation = location?.trim() ?? '';
  const rentalDays = getRentalDays(startDate, endDate);
  const total = (car?.pricePerDay ?? 0) * rentalDays;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Booking preview</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BookingProgress activeStep={3} />

        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={29} color="#203F36" />
        </View>
        <Text style={styles.title}>You're going places.</Text>
        <Text style={styles.subtitle}>
          This is a demo receipt. No payment was taken and no booking was saved.
        </Text>

        {car ? (
          <View style={styles.receiptCard}>
            <View style={styles.receiptHeader}>
              <Text style={styles.receiptLabel}>DEMO RECEIPT</Text>
              <Text style={styles.status}>PREVIEW</Text>
            </View>

            <View style={styles.carRow}>
              <Image
                source={require('../assets/images/placeholder.png')}
                style={styles.carImage}
                resizeMode="cover"
              />
              <View style={styles.carInfo}>
                <Text style={styles.carName}>{car.make} {car.model}</Text>
                <Text style={styles.carSubtitle}>{car.year} · {car.color}</Text>
                <View style={styles.metaRow}>
                  <Ionicons name="flash" size={12} color="#315E4A" />
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
              <Ionicons name="location-outline" size={19} color="#263A32" />
              <Text style={styles.locationText}>
                {pickupLocation || 'Pickup location to be confirmed'}
              </Text>
            </View>

            <View style={styles.paymentRow}>
              <Text style={styles.paymentText}>Demo card payment · not charged</Text>
              <Text style={styles.total}>{total.toLocaleString('en-GB')} DKK</Text>
            </View>
          </View>
        ) : (
          <View style={styles.receiptCard}>
            <Text style={styles.carName}>Receipt preview unavailable</Text>
          </View>
        )}

        <View style={styles.nextStep}>
          <Ionicons name="key-outline" size={18} color="#315E4A" />
          <View style={styles.nextStepCopy}>
            <Text style={styles.nextStepTitle}>Next stop: a smooth pickup</Text>
            <Text style={styles.nextStepText}>
              Your pickup instructions will appear here once bookings are connected.
            </Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          This confirmation is for visual demonstration only.
        </Text>
      </ScrollView>

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
  content: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 18,
    paddingHorizontal: 22,
  },
  successIcon: {
    alignItems: 'center',
    backgroundColor: '#CDEEDC',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    marginBottom: 8,
    width: 56,
  },
  title: {
    color: '#263A32',
    fontSize: 27,
    fontWeight: '400',
    textAlign: 'center',
  },
  subtitle: {
    color: '#7D8983',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 13,
    marginTop: 5,
    maxWidth: 310,
    textAlign: 'center',
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 20,
    borderWidth: 1,
    padding: 13,
    width: '100%',
  },
  receiptHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  receiptLabel: {
    color: '#7D8983',
    fontSize: 9,
    letterSpacing: 1,
  },
  status: {
    color: '#315E4A',
    fontSize: 9,
    fontWeight: '700',
  },
  carRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  carImage: {
    backgroundColor: '#DDE2E2',
    borderRadius: 11,
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
    fontSize: 11,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
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
    marginTop: 12,
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
    alignItems: 'center',
    borderBottomColor: '#E1E5DE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 9,
    paddingVertical: 10,
  },
  locationText: {
    color: '#34433D',
    flex: 1,
    fontSize: 12,
  },
  paymentRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  paymentText: {
    color: '#7D8983',
    flex: 1,
    fontSize: 11,
  },
  total: {
    color: '#263A32',
    fontSize: 13,
    fontWeight: '600',
  },
  nextStep: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
    marginTop: 15,
    width: '100%',
  },
  nextStepCopy: {
    flex: 1,
    gap: 4,
  },
  nextStepTitle: {
    color: '#34433D',
    fontSize: 13,
    fontWeight: '500',
  },
  nextStepText: {
    color: '#7D8983',
    fontSize: 11,
    lineHeight: 16,
  },
  disclaimer: {
    color: '#7D8983',
    fontSize: 10,
    marginTop: 10,
    textAlign: 'center',
  },
});
