export type RootStackParamList = {
  Home: undefined;
  Signup: undefined;
  Profile: undefined;
  SearchResults: undefined;
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