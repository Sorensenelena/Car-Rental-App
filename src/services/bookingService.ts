import AsyncStorage from '@react-native-async-storage/async-storage';

export type Booking = {
  id: string;
  carId: number;
  startDate: string; // 'YYYY-MM-DD'
  endDate: string;
};

export async function getBookings(): Promise<Booking[]> {
  const raw = await AsyncStorage.getItem('bookings');
  return raw ? JSON.parse(raw) : [];
}

export async function addBooking(carId: number, startDate: string, endDate: string) {
  const bookings = await getBookings();

  const overlaps = bookings.some(b =>
    b.carId === carId && b.startDate <= endDate && startDate <= b.endDate
  );
  if (overlaps) throw new Error('Car is already booked for these dates');

  bookings.push({ id: Date.now().toString(), carId, startDate, endDate });
  await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
  
  console.log(await getBookings());
}

export async function clearBookings() {
  await AsyncStorage.removeItem('bookings');
}

