import BottomBar from '@/components/bottom-bar';
import Header from '@/components/header';
import ProfileButton from '@/components/profile-button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.main}>
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
      </View>
      <BottomBar backButton={true} profileButton={false} mapButton={true}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    },           
  main: { 
    flex: 7
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
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
}); 