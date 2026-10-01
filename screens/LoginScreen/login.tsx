import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useState } from 'react';
import FormField from '../Signupscreen/components/formfield';

export default function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');


    const DUMMY_ACCOUNT = {
        username: 'admin',
        email: 'admin@example.com',
        password: '1234',
    };

    const handleLogin = () => {
        const value = identifier.trim().toLowerCase();

        const identifierMatches =
            value === DUMMY_ACCOUNT.username || value === DUMMY_ACCOUNT.email;
        const passwordMatches = password === DUMMY_ACCOUNT.password;

        if (identifierMatches && passwordMatches) {
            setLoginError('');
            navigation.navigate('Home');
        } else {
            setLoginError('Incorrect username/email or password');
        }
    };


    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <FormField
                        label="Email/username"
                        value={identifier}
                        onChangeText={setIdentifier}
                        autoCapitalize="none"
                    />

                    <FormField
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>
                {loginError !== '' && <Text style={styles.errorText}>{loginError}</Text>}

                <Pressable onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: 'grey',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 14,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '80%',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
    },
});