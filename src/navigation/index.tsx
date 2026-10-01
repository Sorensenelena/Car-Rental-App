import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { StyleSheet, View } from 'react-native';

import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import SearchResultsScreen from '../../screens/Search_results';
import SignupScreen from '../../screens/Signupscreen/Signup';
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
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }} />
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

