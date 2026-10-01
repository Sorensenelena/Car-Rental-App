import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';

import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import SearchResultsScreen from '../../screens/Search_results';
import BookingDetailsScreen from '../../screens/Booking_details';
import SignupScreen from '../../screens/signup';
import StartScreen from '../../screens/Start';
import LoginScreen from '../../screens/login';
import { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Start">

        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerTitleAlign: 'center' }} />

        <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitleAlign: 'center' }} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // Temporarily disabling header until dicided if used
            headerShown: false
            //title: '',
            //headerShadowVisible: false,
            //headerLeft: () => <View style={styles.logo} />,
            //headerRight: () => <View style={styles.logo} />,
          }}
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
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#D3D3D3',
    margin: 10
  },

  headerButton: {
    paddingHorizontal: 5,
  },

});

registerRootComponent(App);

