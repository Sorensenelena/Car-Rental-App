import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import SearchResultsScreen from '../../screens/Search_results';
import BookingDetailsScreen from '../../screens/Booking_details';
import SignupScreen from '../../screens/signup';
import StartScreen from '../../screens/Start';
import LoginScreen from '../../screens/login';
import MapScreen from '../../screens/Map';
import { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Start">

        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
            name="Booking_details" 
            component={BookingDetailsScreen}
            initialParams={{carId: 1, startDate: '2026-10-01', endDate: '2026-10-04'}}
            options={{ headerShown: false }}
          />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
