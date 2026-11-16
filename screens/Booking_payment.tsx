import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingProgress from '@/components/booking-progress';
import BottomBar from '@/components/bottom-bar';
import carsData from '../src/data/cars.json';
import { Car, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingPayment'>;

const cars = carsData as Car[];

function formatShortDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
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

export default function BookingPaymentScreen({ route, navigation }: Props) {
  const { carId, startDate, endDate, location } = route.params;
  const car = cars.find((item) => item.id === carId);
  const rentalDays = getRentalDays(startDate, endDate);
  const total = (car?.pricePerDay ?? 0) * rentalDays;
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>Secure checkout</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BookingProgress activeStep={2} />
          <Text style={styles.title}>Make it a plan.</Text>
          <Text style={styles.subtitle}>Your weekend is just one step away.</Text>

          {car ? (
            <View style={styles.bookingCard}>
              <View style={styles.carRow}>
                <Image
                  source={require('../assets/images/placeholder.png')}
                  style={styles.carImage}
                  resizeMode="cover"
                />
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{car.make} {car.model}</Text>
                  <Text style={styles.carSubtitle}>{car.year} · {car.color}</Text>
                  <View style={styles.carMetaRow}>
                    <Ionicons name="flash" size={12} color="#315E4A" />
                    <Text style={styles.carMeta}>Electric car</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.dateSummary}>
                {formatShortDate(startDate)} – {formatShortDate(endDate)}
                {location?.trim() ? ` · ${location.trim()}` : ''}
              </Text>
            </View>
          ) : (
            <View style={styles.bookingCard}>
              <Text style={styles.carName}>Booking summary unavailable</Text>
            </View>
          )}

          <View style={styles.paymentMethod}>
            <View style={styles.methodLabel}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#315E4A" />
              <Text style={styles.methodText}>Credit or debit card</Text>
            </View>
            <Text style={styles.cardBrands}>VISA / MC</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Name on card</Text>
            <TextInput
              accessibilityLabel="Name on card"
              autoComplete="off"
              autoCapitalize="words"
              onChangeText={setName}
              style={styles.input}
              value={name}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Card number</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                accessibilityLabel="Card number"
                autoComplete="off"
                keyboardType="number-pad"
                onChangeText={setCardNumber}
                style={styles.inputText}
                value={cardNumber}
              />
              <Ionicons name="card-outline" size={18} color="#263A32" />
            </View>
          </View>

          <View style={styles.splitFields}>
            <View style={[styles.field, styles.splitField]}>
              <Text style={styles.fieldLabel}>Expiry date</Text>
              <TextInput
                accessibilityLabel="Expiry date"
                autoComplete="off"
                keyboardType="numbers-and-punctuation"
                onChangeText={setExpiry}
                style={styles.input}
                value={expiry}
              />
            </View>
            <View style={[styles.field, styles.splitField]}>
              <Text style={styles.fieldLabel}>Security code</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  accessibilityLabel="Security code"
                  autoComplete="off"
                  keyboardType="number-pad"
                  onChangeText={setSecurityCode}
                  secureTextEntry
                  style={styles.inputText}
                  value={securityCode}
                />
                <Ionicons name="lock-closed-outline" size={18} color="#263A32" />
              </View>
            </View>
          </View>

          <View style={styles.saveCardRow}>
            <View style={styles.checkbox} />
            <Text style={styles.saveCardText}>Save this card for my next trip</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total to pay · incl. VAT</Text>
            <Text style={styles.totalValue}>{total.toLocaleString('en-GB')} DKK</Text>
          </View>

          <Text style={styles.terms}>
            By paying, you accept the rental terms and cancellation policy. Your payment is
            encrypted and secure.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('BookingConfirmed', route.params)}
            style={styles.payButton}
          >
            <Text style={styles.payButtonText}>
              Pay {total.toLocaleString('en-GB')} DKK &amp; book
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F7F1',
    flex: 1,
  },
  flex: {
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
    paddingBottom: 14,
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
    marginBottom: 13,
    marginTop: 4,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 17,
    borderWidth: 1,
    marginBottom: 11,
    padding: 11,
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
    gap: 4,
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
  carMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  carMeta: {
    color: '#34433D',
    fontSize: 11,
  },
  dateSummary: {
    color: '#7D8983',
    fontSize: 11,
    marginTop: 9,
  },
  paymentMethod: {
    alignItems: 'center',
    backgroundColor: '#EDF1E9',
    borderColor: '#315E4A',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  methodLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  methodText: {
    color: '#263A32',
    fontSize: 13,
    fontWeight: '600',
  },
  cardBrands: {
    color: '#263A32',
    fontSize: 9,
    fontWeight: '700',
  },
  field: {
    gap: 5,
    marginBottom: 9,
  },
  fieldLabel: {
    color: '#34433D',
    fontSize: 11,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 12,
    borderWidth: 1,
    color: '#34433D',
    fontSize: 14,
    height: 44,
    paddingHorizontal: 13,
  },
  inputWithIcon: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 13,
  },
  inputText: {
    color: '#34433D',
    flex: 1,
    fontSize: 14,
    height: '100%',
    paddingVertical: 0,
  },
  splitFields: {
    flexDirection: 'row',
    gap: 12,
  },
  splitField: {
    flex: 1,
    minWidth: 0,
  },
  saveCardRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#8D9992',
    borderRadius: 4,
    borderWidth: 1,
    height: 17,
    width: 17,
  },
  saveCardText: {
    color: '#7D8983',
    fontSize: 11,
  },
  totalRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    color: '#34433D',
    fontSize: 15,
  },
  totalValue: {
    color: '#263A32',
    fontSize: 18,
    fontWeight: '700',
  },
  terms: {
    color: '#7D8983',
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 10,
  },
  payButton: {
    alignItems: 'center',
    backgroundColor: '#203F36',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 52,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
