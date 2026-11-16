import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_ACCOUNT } from '../src/data/mock-account';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileSection'>;

const sectionContent = {
  trips: {
    title: 'My trips',
    subtitle: 'Your upcoming adventures and past journeys.',
    icon: 'calendar-outline',
    rows: [
      { label: 'UPCOMING TRIP', value: MOCK_ACCOUNT.upcomingTrip.car },
      { label: 'Dates', value: MOCK_ACCOUNT.upcomingTrip.dates },
      { label: 'Pickup', value: MOCK_ACCOUNT.upcomingTrip.location },
      { label: 'PAST TRIP', value: MOCK_ACCOUNT.pastTrip.car },
      { label: 'Dates', value: MOCK_ACCOUNT.pastTrip.dates },
      { label: 'Pickup', value: MOCK_ACCOUNT.pastTrip.location },
    ],
  },
  personal: {
    title: 'Personal information',
    subtitle: 'Your contact details and driving licence.',
    icon: 'person-outline',
    rows: [
      { label: 'FULL NAME', value: MOCK_ACCOUNT.fullName },
      { label: 'EMAIL ADDRESS', value: MOCK_ACCOUNT.email },
      { label: 'PHONE NUMBER', value: MOCK_ACCOUNT.phone },
      { label: 'HOME ADDRESS', value: MOCK_ACCOUNT.address },
      { label: 'DRIVING LICENCE', value: MOCK_ACCOUNT.driverLicense },
      { label: 'LICENCE STATUS', value: MOCK_ACCOUNT.licenseExpiry },
    ],
  },
  payments: {
    title: 'Payment methods',
    subtitle: 'Payment details saved to your demo profile.',
    icon: 'card-outline',
    rows: [
      { label: 'DEFAULT CARD', value: `${MOCK_ACCOUNT.cardBrand} ending in ${MOCK_ACCOUNT.cardLastFour}` },
      { label: 'CARDHOLDER', value: MOCK_ACCOUNT.fullName },
      { label: 'PAYMENT STATUS', value: 'Demo account · no real payments' },
    ],
  },
  privacy: {
    title: 'Notifications & privacy',
    subtitle: 'Your current demo preferences.',
    icon: 'lock-closed-outline',
    rows: [
      { label: 'NOTIFICATIONS', value: MOCK_ACCOUNT.notifications },
      { label: 'PROFILE PRIVACY', value: MOCK_ACCOUNT.privacy },
      { label: 'DATA & SECURITY', value: 'Your information is for this local demo only' },
    ],
  },
  help: {
    title: 'Help & support',
    subtitle: 'Helpful information for your next trip.',
    icon: 'help-circle-outline',
    rows: [
      { label: 'SUPPORT EMAIL', value: 'help@greenride.example' },
      { label: 'SUPPORT HOURS', value: 'Every day · 08:00–20:00' },
      { label: 'EMERGENCY ASSISTANCE', value: 'Roadside help is included with eligible rentals' },
    ],
  },
} as const;

export default function ProfileSectionScreen({ route, navigation }: Props) {
  const content = sectionContent[route.params.section];

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name={content.icon} size={25} color="#315E4A" />
        </View>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>

        <View style={styles.infoCard}>
          {content.rows.map((row, index) => (
            <View
              key={`${row.label}-${index}`}
              style={[
                styles.infoRow,
                index === content.rows.length - 1 && styles.lastInfoRow,
              ]}
            >
              <Text style={styles.label}>{row.label}</Text>
              <Text style={styles.value}>{row.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to profile"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Back to profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F7F1',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    height: 62,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#203F36',
    fontSize: 17,
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 22,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: '#EDF1E9',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    marginBottom: 14,
    width: 56,
  },
  title: {
    color: '#263A32',
    fontSize: 26,
  },
  subtitle: {
    color: '#7D8983',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  infoRow: {
    borderBottomColor: '#E1E5DE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 5,
    paddingVertical: 13,
  },
  lastInfoRow: {
    borderBottomWidth: 0,
  },
  label: {
    color: '#7D8983',
    fontSize: 10,
    letterSpacing: 0.6,
  },
  value: {
    color: '#34433D',
    fontSize: 14,
    lineHeight: 19,
  },
  footer: {
    backgroundColor: '#F8F7F1',
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#203F36',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 9,
    justifyContent: 'center',
    minHeight: 48,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
