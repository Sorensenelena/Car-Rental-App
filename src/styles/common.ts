// src/styles/common.ts
import { StyleSheet } from 'react-native';

export const colors = {
  primary: 'grey',
  label: '#404040',
  text: 'white',
  error: 'red',
};

export const common = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 2,
  },
});