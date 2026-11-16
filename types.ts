export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Profile: undefined;
  Map: { location?: string; startDate?: string; endDate?: string } | undefined;
  SearchResults: { location: string; startDate: string; endDate: string };
  Booking_details: { carId: number; startDate: string; endDate: string; location?: string };
  BookingSummary: { carId: number; startDate: string; endDate: string; location?: string };
  BookingPayment: { carId: number; startDate: string; endDate: string; location?: string };
  BookingConfirmed: { carId: number; startDate: string; endDate: string; location?: string };
  ProfileSection: {
    section: 'trips' | 'personal' | 'payments' | 'privacy' | 'help';
  };
  Start: undefined;
  Login: undefined;
    // TODO: add the other screens here
};

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  isAvailable: boolean;
};