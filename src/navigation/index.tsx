import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { StyleSheet } from 'react-native';

import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import SearchResultsScreen from '../../screens/Search_results';
import SignupScreen from '../../screens/Signupscreen/Signup';
import { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen 
          name="Signup"
          component={SignupScreen} 
          options={{headerShown: false}}/>
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
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: { width: 50, height: 50, backgroundColor: '#D3D3D3', margin: 10 },
});

registerRootComponent(App);