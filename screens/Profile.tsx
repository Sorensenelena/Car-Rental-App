import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { RootStackParamList } from '../types';

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