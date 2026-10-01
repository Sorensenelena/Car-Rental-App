import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileInfo() {
  const [text, setText] = useState('');

  return (
    <View style={styles.card}>
      <Image source={require('@/assets/images/logoipsum-logo-icon.png')} />
      <Image source={require('@/assets/images/profile-icon.png')} />
      <Text>name</Text>
      <Text>More Info</Text>
    </View>
  );
}

const styles = StyleSheet.create({
        container: { 
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'
    },                         
        card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
    },
        text: {}
});