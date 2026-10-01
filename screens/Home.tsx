import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import BottomBar from '@/components/Bottombar';

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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.image} />

        <TextInput style={styles.pill} placeholder="Location" placeholderTextColor="#eee" value={location} onChangeText={setLocation} />
        <TextInput style={styles.pill} placeholder="Start date (YYYY-MM-DD)" placeholderTextColor="#eee" value={startdate} onChangeText={setStartdate} />
        <TextInput style={styles.pill} placeholder="End date (YYYY-MM-DD)" placeholderTextColor="#eee" value={enddate} onChangeText={setEnddate} />

        <Pressable style={[styles.pill, styles.search]} onPress={search}>
          <Text style={styles.searchText}>Search</Text>
        </Pressable>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>

      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  image: { width: '90%', height: 80, backgroundColor: '#D3D3D3', borderWidth: 1, borderColor: '#999', marginBottom: 8 },
  pill: { width: '65%', height: 44, borderRadius: 22, backgroundColor: '#757575', paddingHorizontal: 20, color: '#fff' },
  search: { backgroundColor: '#AAAAAA', justifyContent: 'center', alignItems: 'center' },
  searchText: { color: '#fff', fontWeight: 'bold' },
  error: { color: '#B00020' },
});