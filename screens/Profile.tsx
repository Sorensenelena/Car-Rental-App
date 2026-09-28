import ProfileButton from '@/components/Profile-button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('@/assets/images/logoipsum-logo-icon.png')} />
        <View style={styles.profileLogoAndInfo}>
          <Image source={require('@/assets/images/profile-icon.png')} />
          <View style={styles.profileInfo}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>More Info</Text>
          </View>
        </View>
      <View>
        <ProfileButton name='Drivers license' link=''/>
        <ProfileButton name='Current rentals' link=''/>
        <ProfileButton name='Previous rentals' link=''/>
      </View>
      <View style={styles.bottomMenu}>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center'
    },                  
  logo: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  text: {
      margin: 5
  },
  profileInfo: {
    flexDirection: 'column'
    
  },
  profileLogoAndInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  bottomMenu:{
    alignSelf: 'flex-end',
    backgroundColor: 'dimgrey',
    
  },
}); 