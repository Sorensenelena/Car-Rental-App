import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../types';


type BottomBarProps = {
  backButton: boolean; // set to true if menu needs a go back button
  mapButton: boolean;
  profileButton: boolean;
};

type BackButtonProps = {
};

function BackButton(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return(
      <View style={{left: 0, position: 'absolute'}}>
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image source={require('@/assets/images/arrow-left-square.png')} />
        </Pressable>
      </View>
    );
}

function MapButton(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return(
      <View>
        <Pressable style={styles.mapButton}>
          <Text>Map View</Text>
          <Image style={{marginLeft: 15}} source={require('@/assets/images/map-icon.png')} />
        </Pressable>
      </View>
    );
}

function ProfileButton(){
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return(
      <View style={{ right:0, position: 'absolute'}}>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Image style={{width: 60, height: 60, }} source={require('@/assets/images/profile-icon.png')} />
        </Pressable>
      </View>
    );
}

export default function BottomBar({backButton, profileButton, mapButton}: BottomBarProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.bottomBar}>
      {backButton && <BackButton/>} {/*only renders if backbutton is true*/}
      {mapButton && <MapButton/>}
      {profileButton && <ProfileButton/>}
    </View>
  );
}

const styles = StyleSheet.create({
    bottomBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      justifyContent: 'center'
    },
    mapButton:{
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: 'grey' , 
      padding: 5, 
      paddingRight: 20,
      paddingLeft: 20,
      borderRadius: 20
    }
});