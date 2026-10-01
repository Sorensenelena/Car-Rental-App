import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../types';


type BottomBarProps = {
  backButton: boolean; // set to true if menu needs a go back button

};

type BackButtonProps = {
};

function BackButton(){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return(
      <View >
        <Pressable
          onPress={() => {navigation.goBack}}>
          <Image source={require('@/assets/images/arrow-left-square.png')} />
        </Pressable>
      </View>
    );
}

export default function BottomBar({backButton}: BottomBarProps) {
  return (
    <View style={styles.bottomBar}>
      {backButton && <BackButton/>} {/*only renders if backbutton is true*/}
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