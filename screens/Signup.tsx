import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useLayoutEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

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

          <View style={styles.nameRow}>
            <View style={styles.nameFieldContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.nameField}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.nameFieldContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.nameField}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View style={styles.nameRow}>
            <View style={styles.monthField}>
              <Text style={styles.label}>Month</Text>
              <Picker
                selectedValue={birthMonth}
                onValueChange={(itemValue) => setBirthMonth(itemValue)}
                style={styles.monthPicker}
              >
                <Picker.Item label="Select month" value="" />
                <Picker.Item label="January" value="January" />
                <Picker.Item label="February" value="February" />
                <Picker.Item label="March" value="March" />
                <Picker.Item label="April" value="April" />
                <Picker.Item label="May" value="May" />
                <Picker.Item label="June" value="June" />
                <Picker.Item label="July" value="July" />
                <Picker.Item label="August" value="August" />
                <Picker.Item label="September" value="September" />
                <Picker.Item label="October" value="October" />
                <Picker.Item label="November" value="November" />
                <Picker.Item label="December" value="December" />
              </Picker>
            </View>

            <View style={styles.dayField}>
              <Text style={styles.label}>Day</Text>
              <TextInput
                style={styles.dateInput}
                value={birthDay}
                onChangeText={setBirthDay}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.yearField}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.dateInput}
                value={birthYear}
                onChangeText={setBirthYear}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
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
            <Text style={styles.label}> Confirm password</Text>
            <TextInput
              style={styles.input}
              value={ConfirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  headerButton: {
    paddingHorizontal: 5,
  },

  headerButtonText: {
    fontSize: 16,
    color: 'green',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'grey',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },

  bottomBarText: {
    fontSize: 16,
    color: 'black',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },

  label: {
    marginBottom: 5,
  },

  input: {
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    marginTop: 3,
  },

  nameRow: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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

  form: {
    width: '80%',
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

  nameField: {
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'grey',
    width: '100%',
    height: 35,
    padding: 5,
    marginTop: 5,
  },

  dateInput: {
    color: 'white',
    borderRadius: 10,
    backgroundColor: 'grey',
    width: '100%',
    height: 35,
    padding: 5,
  },

  monthPicker: {
    backgroundColor: 'grey',
    width: '100%',
    height: 35,
  },

  loginRow: {
  position: 'absolute',
  top: 500,      
  right: 20,     
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,       
},
});