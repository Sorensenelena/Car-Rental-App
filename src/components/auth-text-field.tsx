import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = TextInputProps & {
  label: string;
  helperText?: string;
  error?: string;
  password?: boolean;
};

export default function AuthTextField({
  label,
  helperText,
  error,
  password = false,
  style,
  ...inputProps
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          {...inputProps}
          autoCapitalize={inputProps.autoCapitalize ?? 'none'}
          secureTextEntry={password && !passwordVisible}
          style={[styles.input, style]}
        />
        {password && (
          <Pressable
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setPasswordVisible((visible) => !visible)}
            style={styles.visibilityButton}
          >
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#26332F"
            />
          </Pressable>
        )}
      </View>
      {!!helperText && <Text style={styles.helper}>{helperText}</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 17,
  },
  label: {
    color: '#2A3D36',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE1D9',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 52,
    paddingHorizontal: 13,
  },
  inputError: {
    borderColor: '#B5483A',
  },
  input: {
    color: '#263A33',
    flex: 1,
    fontSize: 14,
    minHeight: 50,
    paddingVertical: 0,
  },
  visibilityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    width: 26,
  },
  helper: {
    color: '#818B86',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 7,
  },
  error: {
    color: '#A7372D',
    fontSize: 12,
    marginTop: 6,
  },
});
