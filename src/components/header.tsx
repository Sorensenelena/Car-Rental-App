import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../types';

export default function Header() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
        
    </View>
  );
}

const styles = StyleSheet.create({
    header: {

    },
});