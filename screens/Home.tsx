import BottomBar from '@/components/bottom-bar';
import Header from '@/components/header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../types';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState('');
  const [startdate, setStartdate] = useState('');
  const [enddate, setEnddate] = useState('');

  return (
    <View style={styles.container}>
      <Header/>
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
      <BottomBar backButton={false} mapButton={true} profileButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({            
    container:{
      flex: 1
    },          
    card: {
      flex: 7,
    },
    input: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      margin: 10,
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