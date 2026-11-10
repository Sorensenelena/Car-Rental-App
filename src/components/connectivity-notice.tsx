import { StyleSheet, Text, View } from 'react-native';

export default function ConnectivityNotice() {
  return (
    <View style={styles.container} accessibilityRole="text">
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>↻</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>No internet connection</Text>
        <Text style={styles.subtitle}>Trying to reconnect...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    flexDirection: 'row',
    gap: 11,
    minHeight: 53,
    paddingHorizontal: 14,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#D5EFE0',
    borderRadius: 14,
    height: 27,
    justifyContent: 'center',
    width: 27,
  },
  icon: {
    color: '#315E4A',
    fontSize: 22,
    lineHeight: 24,
  },
  copy: {
    gap: 1,
  },
  title: {
    color: '#203F36',
    fontSize: 13,
    fontWeight: '600',
  },
  subtitle: {
    color: '#818B86',
    fontSize: 12,
  },
});
