import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleSignup = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(birthMonth);
    console.log(birthDay);
    console.log(birthYear);
    console.log(username);
    console.log(email);
    console.log(password);
  };

  return (
    <View style={styles.container}>


      <View style={styles.form}>

        <View style={styles.nameRow}>

          <View style={styles.nameFieldContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.nameField}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
          </View>

          <View style={styles.nameFieldContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.nameField}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
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
              style={styles.nameInput}
              value={birthDay}
              onChangeText={setBirthDay}
              placeholder="Day"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.yearField}>
            <Text style={styles.label}>Year</Text>
            <TextInput
              style={styles.nameInput}
              value={birthYear}
              onChangeText={setBirthYear}
              placeholder="Year"
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
            placeholder="Username"
          />
        </View>

        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
        </View>

        <Pressable onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Confirm sign up</Text>
        </Pressable>
      </View>


    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    height: '50%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  label: {
    marginBottom: 5,
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    marginTop: 3,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  button: {
    alignSelf: 'center',
    backgroundColor: 'green',
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
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    height: 35,
    padding: 5,
    marginTop: 5,
  },

  nameInput: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    height: 35,
    padding: 5,
  },

  monthPicker: {
    width: '100%',
    height: 35,
  },
});