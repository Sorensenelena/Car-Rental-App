import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '@/components/bottom-bar';
import carsData from '../src/data/cars.json';
import { Car, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking_details'>;

const cars = carsData as Car[];

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

export default function BookingDetailsScreen({ route, navigation }: Props) {
  const { carId, startDate, endDate } = route.params;
  const car = cars.find((item) => item.id === carId);
  const [isFavorite, setIsFavorite] = useState(false);
  const rentalDays = getRentalDays(startDate, endDate);
  const totalPrice = (car?.pricePerDay ?? 0) * rentalDays;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Your next ride</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {car ? (
          <>
            <View style={styles.hero}>
              <Image
                source={require('../assets/images/placeholder.png')}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.imageCount}>
                <Text style={styles.imageCountText}>1 / 1</Text>
              </View>
            </View>

            <View style={styles.titleRow}>
              <Text style={styles.carTitle}>{car.make} {car.model}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                accessibilityState={{ selected: isFavorite }}
                onPress={() => setIsFavorite((favorite) => !favorite)}
                hitSlop={10}
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={25}
                  color={isFavorite ? '#B54E45' : '#17221F'}
                />
              </Pressable>
            </View>
            <Text style={styles.subtitle}>
              {car.year} · {car.color}
            </Text>

            <View style={styles.specs}>
              <View style={styles.specCard}>
                <Ionicons name="car-outline" size={18} color="#315E4A" />
                <Text style={styles.specTitle}>{car.year}</Text>
                <Text style={styles.specCaption}>Model year</Text>
              </View>
              <View style={styles.specCard}>
                <Ionicons name="color-palette-outline" size={18} color="#315E4A" />
                <Text style={styles.specTitle}>{car.color}</Text>
                <Text style={styles.specCaption}>Exterior</Text>
              </View>
              <View style={styles.specCard}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#315E4A" />
                <Text style={styles.specTitle}>Available</Text>
                <Text style={styles.specCaption}>Your dates</Text>
              </View>
            </View>

            <Text style={styles.description}>
              Review the vehicle details and rental price for your selected dates before booking.
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vehicle details</Text>
              <DetailRow label="Make and model" value={`${car.make} ${car.model}`} />
              <DetailRow label="Model year" value={String(car.year)} />
              <DetailRow label="Exterior color" value={car.color} />
              <DetailRow label="Availability" value="Available for selected dates" />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your rental</Text>
              <DetailRow label="Pickup" value={formatDate(startDate)} />
              <DetailRow label="Return" value={formatDate(endDate)} />
              <DetailRow label="Duration" value={`${rentalDays} ${rentalDays === 1 ? 'day' : 'days'}`} />
            </View>

          </>
        ) : (
          <View style={styles.missingCar}>
            <Ionicons name="car-outline" size={38} color="#7D8983" />
            <Text style={styles.missingTitle}>Car details unavailable</Text>
            <Text style={styles.missingCopy}>
              This car could not be found. Go back to your search and choose another result.
            </Text>
          </View>
        )}
      </ScrollView>

      {car && (
        <View style={styles.bookingBar}>
          <View style={styles.priceBlock}>
            <Text style={styles.dailyPrice}>{car.pricePerDay} DKK / day</Text>
            <Text style={styles.totalPrice}>
              {totalPrice.toLocaleString('en-GB')} DKK total · {formatDate(startDate)}–{formatDate(endDate)}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('BookingSummary', route.params)}
            style={styles.bookButton}
          >
            <Text style={styles.bookButtonText}>Book now</Text>
          </Pressable>
        </View>
      )}

      <BottomBar />
    </SafeAreaView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
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
    paddingBottom: 18,
    paddingHorizontal: 24,
  },
  hero: {
    height: 194,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    backgroundColor: '#DDE2E2',
    borderRadius: 13,
    height: '100%',
    width: '100%',
  },
  imageCount: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 14,
    bottom: 10,
    paddingHorizontal: 11,
    paddingVertical: 5,
    position: 'absolute',
    right: 12,
  },
  imageCountText: {
    color: '#263A32',
    fontSize: 11,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carTitle: {
    color: '#263A32',
    flex: 1,
    fontSize: 25,
    fontWeight: '400',
  },
  subtitle: {
    color: '#7D8983',
    fontSize: 12,
    marginTop: 5,
  },
  specs: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 17,
  },
  specCard: {
    backgroundColor: '#EDF1E9',
    borderRadius: 13,
    flex: 1,
    gap: 5,
    minHeight: 82,
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
  specTitle: {
    color: '#263A32',
    fontSize: 14,
    fontWeight: '600',
  },
  specCaption: {
    color: '#7D8983',
    fontSize: 10,
  },
  description: {
    color: '#7D8983',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 16,
  },
  section: {
    borderTopColor: '#E1E5DE',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 17,
    paddingTop: 13,
  },
  sectionTitle: {
    color: '#263A32',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: {
    color: '#7D8983',
    fontSize: 12,
  },
  detailValue: {
    color: '#34433D',
    fontSize: 12,
    fontWeight: '500',
  },
  missingCar: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 90,
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
  bookingBar: {
    alignItems: 'center',
    backgroundColor: '#F8F7F1',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  priceBlock: {
    flex: 1,
  },
  dailyPrice: {
    color: '#263A32',
    fontSize: 17,
    fontWeight: '700',
  },
  totalPrice: {
    color: '#7D8983',
    fontSize: 10,
    marginTop: 4,
  },
  bookButton: {
    alignItems: 'center',
    backgroundColor: '#203F36',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 52,
    minWidth: 140,
    paddingHorizontal: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
