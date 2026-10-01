import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../types';


type BottomBarProps = {
  screen: keyof RootStackParamList;
  backButton: boolean; // set to true if menu needs a go back button

};

type BackButtonProps = {
  screen: keyof RootStackParamList;
};

function BackButton({screen}: BackButtonProps){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return(
      <View >
        <Pressable
          onPress={() => {navigation.navigate(screen)}}>
          <Image source={require('@/assets/images/arrow-left-square.png')} />
        </Pressable>
      </View>
    );
}

export default function BottomBar({screen, backButton}: BottomBarProps) {
  return (
    <View style={styles.bottomBar}>
      {backButton && <BackButton screen={screen}/>} {/*only renders if backbutton is true*/}


      <View style={{marginLeft: 'auto'}}>
          <Image style={{width: 60, height: 60, }} source={require('@/assets/images/profile-icon.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    bottomBar: {
      flexDirection: 'row',
      backgroundColor: 'lightgrey',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center'
    }
});