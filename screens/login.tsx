import FormField from '@/components/formfield';
import PrimaryButton from '@/components/primaryButton';
import { common } from '@/styles/common';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types';

const DUMMY_ACCOUNT = {
    username: 'admin',
    email: 'admin@example.com',
    password: '1234',
};

export default function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

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
        <View style={common.screen}>
            <View style={common.container}>
                <View style={common.form}>
                    <FormField
                        label="Email/username"
                        value={identifier}
                        onChangeText={(text) => {
                            setIdentifier(text);
                            setLoginError('');
                        }}
                        autoCapitalize="none"
                    />

                    <FormField
                        label="Password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            setLoginError('');
                        }}
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    {loginError !== '' && <Text style={common.errorText}>{loginError}</Text>}
                    <PrimaryButton
                        title="Login"
                        onPress={handleLogin}
                        style={styles.loginButton}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        width: '60%',
        alignSelf: 'center',
    },
});