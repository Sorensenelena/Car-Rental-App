import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useState } from 'react';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');

  return (
    <View style={styles.card}>
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
        placeholder="Start date..."
      />
      <TextInput
        style={styles.input}
        value={enddate}
        onChangeText={setEnddate}
        placeholder="End date..."
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}
        onPress={() => navigation.navigate('SearchResults')}
        >Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({                      
    card: {
      padding: 10,
      gap: 20, 
    },
    input: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      backgroundColor: '#D3D3D3',
      borderColor: '#D3D3D3',
    },
    button: {
      alignSelf: 'center',
      backgroundColor: '#808080',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    buttonText: {
      color: 'black',
    },
}); 