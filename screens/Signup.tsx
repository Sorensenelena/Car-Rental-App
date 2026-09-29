import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useLayoutEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sign Up',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.headerButton}>
          <Ionicons name="home" size={25} color="grey" />
        </Pressable>
      ),
    });
  }, [navigation]);

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
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.form}>
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

            <View style={styles.dayField}>
              <Text style={styles.label}>Day</Text>
              <TextInput
                style={styles.smallInput}
                value={birthDay}
                onChangeText={setBirthDay}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.yearField}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.smallInput}
                value={birthYear}
                onChangeText={setBirthYear}
                keyboardType="numeric"
              />
            </View>
          </View>

          {dateHasLetters && (
            <Text style={styles.errorText}>Day and year must be numbers only</Text>
          )}

          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View>
            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              style={styles.input}
              value={ConfirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {passwordsMismatch && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>

          <Pressable onPress={handleSignup} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const inputBase = {
  color: 'white',
  backgroundColor: 'grey',
  borderRadius: 10,
  padding: 5,
} as const;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  form: {
    width: '80%',
  },
  headerButton: {
    paddingHorizontal: 5,
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
  input: {
    ...inputBase,
    marginBottom: 5,
    marginTop: 3,
  },
  smallInput: {
    ...inputBase,
    width: '100%',
    height: 35,
  },
  monthPicker: {
    backgroundColor: 'grey',
    width: '100%',
    height: 35,
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

  loginRow: {
    position: 'absolute',
    top: 500,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  loginText: {
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});