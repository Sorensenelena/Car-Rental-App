import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import PrimaryButton from '@/components/primaryButton';
import { common } from '@/styles/common';

export default function StartScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={common.screen}>
            <View style={common.container}>
                <Image style={styles.logo} source={require('@/assets/images/logoipsum-logo-icon.png')} />
                <View style={common.form}>
                    <PrimaryButton title="Login" onPress={() => navigation.navigate('Login')} />
                    <PrimaryButton title="Create an account" onPress={() => navigation.navigate('Signup')} />
                    <PrimaryButton title="Browse as guest" onPress={() => navigation.navigate('Home')} />
                </View>
            </View>
        </View>
    );
}  

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 40,
    },
});