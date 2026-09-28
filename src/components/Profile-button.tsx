import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../../types';

type ProfileButtonProps = {
    name: string;
    link: string;
};

export default function ProfileButton({name, link}: ProfileButtonProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
        <Pressable 
            onPress={() => {}}
            style={styles.button}>
            <Text>{name}</Text>
        </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',

        alignSelf: 'stretch'
    },
});