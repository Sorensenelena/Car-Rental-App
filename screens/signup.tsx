import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthScreenHeader from '@/components/auth-screen-header';
import AuthTextField from '@/components/auth-text-field';
import BrandMark from '@/components/brand-mark';
import WelcomeActionButton from '@/components/welcome-action-button';
import { RootStackParamList } from '../types';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignUpScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const Signup = async () => {
    try{
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, {displayName: fullName}).catch((error: any)=>
        console.log(error)  
      );
      navigation.navigate('Home')
    } catch(error: any){
      console.log(error)
      alert('signup failed ' + error.message);
      setFeedback('signup failed ' + error.message);
    }

  }

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setFeedback('Passwords do not match.');
      return;
    }

    setFeedback('Sign up is a visual prototype and is not connected yet.');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      <AuthScreenHeader
        title="Sign up"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <BrandMark style={styles.brand} />
        <Text style={styles.title}>Join the good way.</Text>
        <Text style={styles.subtitle}>A little less car ownership. A lot more possibility.</Text>

        <View style={styles.form}>
          <AuthTextField
            label="Full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoComplete="name"
          />
          <AuthTextField
            label="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
          />
          <AuthTextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            password
            autoComplete="new-password"
            helperText="At least 8 characters, including a number."
          />
          <AuthTextField
            label="Confirm password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setFeedback('');
            }}
            password
            autoComplete="new-password"
            error={confirmPassword.length > 0 && password !== confirmPassword
              ? 'Passwords do not match'
              : undefined}
          />

          <Text style={styles.terms}>
            By signing up, you agree to our <Text style={styles.underlined}>Terms of service</Text>
            {' '}and <Text style={styles.underlined}>Privacy policy</Text>.
          </Text>

          {!!feedback && <Text style={styles.feedback}>{feedback}</Text>}
          <WelcomeActionButton
            title="Sign up"
            variant="primary"
            onPress={Signup}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already part of løv?</Text>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign in</Text>
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
    paddingHorizontal: 30,
    paddingBottom: 18,
  },
  brand: {
    marginHorizontal: -26,
    marginTop: 32,
  },
  title: {
    color: '#203F36',
    fontSize: 29,
    fontWeight: '400',
    letterSpacing: -0.5,
    marginTop: 26,
  },
  subtitle: {
    color: '#7C8883',
    fontSize: 14,
    marginTop: 7,
  },
  form: {
    flexGrow: 1,
    marginTop: 23,
  },
  terms: {
    color: '#818B86',
    fontSize: 11,
    lineHeight: 17,
    marginTop: -1,
    marginBottom: 18,
  },
  underlined: {
    color: '#304A40',
    textDecorationLine: 'underline',
  },
  feedback: {
    color: '#A7372D',
    fontSize: 12,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 'auto',
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 34,
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
