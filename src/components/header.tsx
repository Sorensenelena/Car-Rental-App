import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../types';

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{alignContent: 'flex-start', flexDirection: 'row', }}>
        <Image style={styles.logo} source={require('@/assets/images/logoipsum-logo-icon.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10,
    },
});