export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Profile: undefined;
  SearchResults: { location: string; startDate: string; endDate: string };
  Booking_details: { carId: number; startDate: string; endDate: string };
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