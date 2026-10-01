import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function StartScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (

        <View style={styles.screen}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('@/assets/images/logoipsum-logo-icon.png')} />
                <View style={styles.form}>
                    <Pressable onPress={() => navigation.navigate('Login')} style={styles.button}>
                        <Text style={styles.buttonText}>login</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Signup')} style={styles.button}>
                        <Text style={styles.buttonText}>Create an account</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Home')} style={styles.GuestButton}>
                        <Text style={styles.buttonText}>Browse as guest</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,                  
        alignItems: 'center',    
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    form: {
        width: '80%',
    },
    button: {
        backgroundColor: 'grey',
        paddingVertical: 12,
        borderRadius: 14,
        marginTop: 15,
        alignItems: 'center', 
    },
    GuestButton:{
         backgroundColor: '#B8B8B8',
        paddingVertical: 12,
        borderRadius: 14,
        marginTop: 15,
        alignItems: 'center', 
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
    },
});

