import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useState } from 'react';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [text, setText] = useState('');

  return (
    <View style={styles.card}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Location..."

      />
    </View>
  );
}

const styles = StyleSheet.create({
        container: { 
            flex: 1, alignItems: 'center', justifyContent: 'center'
    },                         
        card: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        borderRadius: 16,
        padding: 10,
        alignItems: 'center',    
    },  
}); 