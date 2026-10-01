import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { StyleSheet, View } from 'react-native';

import HomeScreen from '../../screens/Home';
import SignupScreen from '../../screens/Signupscreen/Signup';
import ProfileScreen from '../../screens/Profile';
import SearchResultsScreen from '../../screens/Search_results';
import BookingDetailsScreen from '../../screens/Booking_details';
import { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerShadowVisible: false,
            headerLeft: () => <View style={styles.logo} />,
            headerRight: () => <View style={styles.logo} />,
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
  logo: { width: 50, height: 50, backgroundColor: '#D3D3D3', margin: 10 },
});

registerRootComponent(App);