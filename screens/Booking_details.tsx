import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addBooking, clearBookings } from '../src/services/bookingService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import BottomBar from '@/components/Bottombar';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking_details'>;

export default function BookingDetailsScreen({ route }: Props) {
  const { carId, startDate, endDate } = route.params;
  const [message, setMessage] = useState('');

  const book = async () => {
    try {
      await addBooking(carId, startDate, endDate);
      setMessage('Booking saved');
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
            <Text style={styles.title}>Booking details</Text>
            <Text>Car: {carId}</Text>
            <Text>{startDate} → {endDate}</Text>

            <Pressable style={styles.button} onPress={book}>
                <Text style={styles.buttonText}>Book</Text>
            </Pressable>

            {message !== '' && <Text>{message}</Text>}

            <Pressable style={styles.button} onPress={async () => { await clearBookings(); setMessage('Bookings cleared'); }}>
                <Text style={styles.buttonText}>Clear bookings</Text>
            </Pressable>
        </View>
        <BottomBar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', gap: 10, padding: 20},
  title: { fontSize: 24, fontWeight: 'bold' },
  button: { alignSelf: 'flex-start', backgroundColor: '#333', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20, marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});