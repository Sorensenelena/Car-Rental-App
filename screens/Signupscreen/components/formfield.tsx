// components/FormField.tsx
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label: string;
  error?: string;
  small?: boolean;
};

export default function FormField({ label, error, small, style, ...inputProps }: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, small && styles.small, style]}
        {...inputProps}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
  small: {
    width: '100%',
    height: 35,
    marginBottom: 0,
    marginTop: 0,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});