import BottomBar from '@/components/bottom-bar';
import Header from '@/components/header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export default function HomeScreen({ navigation }: Props) {
  const [location, setLocation] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');
  const [error, setError] = useState('');

  const search = () => {
    if (!isDate(startdate) || !isDate(enddate)) return setError('Use dates like 2026-10-01');
    if (enddate < startdate) return setError('End date must be after start date');
    setError('');
    navigation.navigate('SearchResults', { location, startDate: startdate, endDate: enddate });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
          <Text style={styles.welcomeText}>Welcome to </Text>
          <Text style={[styles.welcomeText, { color: 'green' }]}>Green</Text>
          <Text style={[styles.welcomeText, { color: 'darkgreen' }]}>Ride</Text>
        </View>

        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Location..."
        />
        <TextInput
          style={styles.input}
          value={startdate}
          onChangeText={setStartdate}
          placeholder="Start date (YYYY-MM-DD)"
        />
        <TextInput
          style={styles.input}
          value={enddate}
          onChangeText={setEnddate}
          placeholder="End date (YYYY-MM-DD)"
        />
        <Pressable style={styles.button} onPress={search}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>
      <BottomBar backButton={false} mapButton={true} profileButton={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 7,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: '#D3D3D3',
    borderColor: '#D3D3D3',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    paddingRight: 50,
    paddingLeft: 50
  },
  buttonText: {
    color: 'black',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  error: { color: '#B00020' },
}); 
