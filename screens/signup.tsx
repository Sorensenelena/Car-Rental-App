import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import FormField from '@/components/formfield';
import PrimaryButton from '@/components/primaryButton';
import { common } from '@/styles/common';
import { RootStackParamList } from '../types';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const passwordsMismatch = ConfirmPassword.length > 0 && password !== ConfirmPassword;
  const dayHasLetters = birthDay.length > 0 && !/^\d+$/.test(birthDay);
  const yearHasLetters = birthYear.length > 0 && !/^\d+$/.test(birthYear);
  const dateHasLetters = dayHasLetters || yearHasLetters;

  const handleSignup = () => {
    if (password !== ConfirmPassword || dateHasLetters) {
      return;
    }

    console.log('firstName:', firstName);
    console.log('lastName:', lastName);
    console.log('birthMonth:', birthMonth);
    console.log('birthDay:', birthDay);
    console.log('birthYear:', birthYear);
    console.log('username:', username);
    console.log('email:', email);
    console.log('password:', password);
    console.log('ConfirmPassword:', ConfirmPassword);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={common.form}>
          <View style={styles.row}>
            <View style={styles.nameFieldContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.smallInput}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.nameFieldContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.smallInput}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.monthField}>
              <Text style={styles.label}>Month</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={birthMonth}
                  onValueChange={(itemValue) => setBirthMonth(itemValue)}
                  style={styles.monthPicker}
                >
                  <Picker.Item label="Select month" value="" />
                  {MONTHS.map((month) => (
                    <Picker.Item key={month} label={month} value={month} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.dayField}>
              <FormField
                label="Day"
                value={birthDay}
                onChangeText={setBirthDay}
                keyboardType="numeric"
                small
              />
            </View>

            <View style={styles.yearField}>
              <FormField
                label="Year"
                value={birthYear}
                onChangeText={setBirthYear}
                keyboardType="numeric"
                small
              />
            </View>
          </View>

          {dateHasLetters && (
            <Text style={common.errorText}>Day and year must be numbers only</Text>
          )}

          <FormField
            label="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <FormField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <FormField
            label="Confirm password"
            value={ConfirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={passwordsMismatch ? 'Passwords do not match' : undefined}
            autoCapitalize="none"
          />

          <PrimaryButton
            title="Sign up"
            onPress={handleSignup}
            style={styles.signupButton}
          />
        </View>
      </View>

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const inputBase = {
  color: 'white',
  backgroundColor: 'grey',
  borderRadius: 10,
  padding: 5,
} as const;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameFieldContainer: {
    width: '48%',
  },
  monthField: {
    width: '46%',
  },
  dayField: {
    width: '22%',
  },
  yearField: {
    width: '26%',
  },
  label: {
    marginBottom: 5,
  },
  smallInput: {
    ...inputBase,
    width: '100%',
    height: 35,
  },
  pickerWrapper: {
    backgroundColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    height: 35,
    justifyContent: 'center',
  },
  monthPicker: {
    width: '100%',
    color: 'white',
    backgroundColor: 'transparent',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 5,
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  signupButton: {
    width: '60%',
    alignSelf: 'center',
  },
});