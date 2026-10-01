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
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 5}}>
          <Text style={styles.welcomeText}>Welcome to </Text>
          <Text style={[styles.welcomeText,{color: 'green'}]}>Green</Text>
          <Text style={[styles.welcomeText,{color: 'darkgreen'}]}>Ride</Text>
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
}); 