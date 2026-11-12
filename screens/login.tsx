import AuthScreenHeader from '@/components/auth-screen-header';
import AuthTextField from '@/components/auth-text-field';
import BrandMark from '@/components/brand-mark';
import WelcomeActionButton from '@/components/welcome-action-button';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../types';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const signIn = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) {
        setLoginError('');
        navigation.navigate('Home')
      }
    } catch(error: any) {
      console.log(error)
      alert('sign in failed ' + error.message);
      setLoginError('Incorrect email or password');
    }
    
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <AuthScreenHeader
        title="Log in"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <BrandMark style={styles.brand} />
        <Text style={styles.title}>Good to see you.</Text>
        <Text style={styles.subtitle}>Log in for your next electric escape.</Text>

        <View style={styles.form}>
          <AuthTextField
            label="Email address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setLoginError('');
            }}
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
          />
          <AuthTextField
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setLoginError('');
            }}
            password
            autoComplete="current-password"
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => setLoginError('Password reset is not available in this demo.')}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          {!!loginError && <Text style={styles.error}>{loginError}</Text>}
          <WelcomeActionButton
            title="Log in"
            variant="primary"
            onPress={signIn}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.securityNote}>
          <Ionicons name="lock-closed-outline" size={15} color="#253B33" />
          <Text style={styles.securityText}>Your details stay safe with us.</Text>
        </View>

        <View style={styles.promoCard}>
          <Text style={styles.promoTitle}>A good way to get going.</Text>
          <Text style={styles.promoText}>
            Local hosts. Fully electric cars. Insurance on every trip.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to løv?</Text>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F7F1',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 27,
    paddingBottom: 20,
  },
  brand: {
    marginHorizontal: -26,
    marginTop: 57,
  },
  title: {
    color: '#203F36',
    fontSize: 29,
    fontWeight: '400',
    letterSpacing: -0.5,
    marginTop: 27,
  },
  subtitle: {
    color: '#7C8883',
    fontSize: 14,
    marginTop: 7,
  },
  form: {
    marginTop: 25,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 0,
    paddingVertical: 2,
  },
  forgotText: {
    color: '#203F36',
    fontSize: 12,
    fontWeight: '600',
  },
  error: {
    color: '#A7372D',
    fontSize: 12,
    marginTop: 8,
  },
  submitButton: {
    marginTop: 16,
    width: '100%',
  },
  securityNote: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 22,
  },
  securityText: {
    color: '#818B86',
    fontSize: 12,
  },
  promoCard: {
    backgroundColor: '#EEF1E9',
    borderRadius: 18,
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  promoTitle: {
    color: '#263A33',
    fontSize: 14,
    marginBottom: 7,
  },
  promoText: {
    color: '#7C8883',
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    marginTop: 21,
  },
  footerText: {
    color: '#7C8883',
    fontSize: 14,
  },
  footerLink: {
    color: '#203F36',
    fontSize: 14,
  },
});
