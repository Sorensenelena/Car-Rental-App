import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '@/components/bottom-bar';
import { MOCK_ACCOUNT } from '../src/data/mock-account';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const profileLinks = [
  {
    section: 'trips',
    title: 'My trips',
    subtitle: 'Upcoming adventures & past journeys',
    icon: 'calendar-outline',
  },
  {
    section: 'personal',
    title: 'Personal information',
    subtitle: 'Contact details & driving licence',
    icon: 'settings-outline',
  },
  {
    section: 'payments',
    title: 'Payment methods',
    subtitle: `${MOCK_ACCOUNT.cardBrand} ending in ${MOCK_ACCOUNT.cardLastFour}`,
    icon: 'card-outline',
  },
  {
    section: 'privacy',
    title: 'Notifications & privacy',
    subtitle: 'Make GreenRide work for you',
    icon: 'lock-closed-outline',
  },
  {
    section: 'help',
    title: 'Help & support',
    subtitle: 'Here for you, before and during a trip',
    icon: 'help-circle-outline',
  },
] as const;

export default function ProfileScreen({ navigation }: Props) {
  const openSection = (section: (typeof profileLinks)[number]['section']) => {
    navigation.navigate('ProfileSection', { section });
  };

  const logOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>My profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{MOCK_ACCOUNT.initials}</Text>
          </View>
          <View style={styles.identityCopy}>
            <Text style={styles.name}>{MOCK_ACCOUNT.fullName}</Text>
            <Text style={styles.location}>
              {MOCK_ACCOUNT.city} · Joined {MOCK_ACCOUNT.joined}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => openSection('personal')}
              style={styles.editButton}
            >
              <Text style={styles.editText}>Edit profile →</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.verifiedCard}>
          <View style={styles.verifiedTitleRow}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#315E4A" />
            <Text style={styles.verifiedTitle}>Verified and ready to go</Text>
          </View>
          <Text style={styles.verifiedCopy}>
            Identity, driving licence and email confirmed.
          </Text>
          <View style={styles.verificationList}>
            <Text style={styles.verificationItem}>✓ Identity</Text>
            <Text style={styles.verificationItem}>✓ Licence</Text>
            <Text style={styles.verificationItem}>✓ Email</Text>
          </View>
        </View>

        <View style={styles.linkList}>
          {profileLinks.map((item, index) => (
            <Pressable
              key={item.section}
              accessibilityRole="button"
              onPress={() => openSection(item.section)}
              style={[styles.linkRow, index === profileLinks.length - 1 && styles.lastLinkRow]}
            >
              <View style={styles.linkIcon}>
                <Ionicons name={item.icon} size={19} color="#263A32" />
              </View>
              <View style={styles.linkCopy}>
                <Text style={styles.linkTitle}>{item.title}</Text>
                <Text style={styles.linkSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={19} color="#263A32" />
            </Pressable>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={logOut}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={20} color="#17221F" />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        <Text style={styles.footer}>GreenRide · A lighter way to get there · v1.0</Text>
      </ScrollView>

      <BottomBar activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F7F1',
    flex: 1,
  },
  heading: {
    alignItems: 'center',
    height: 62,
    justifyContent: 'center',
  },
  headingTitle: {
    color: '#203F36',
    fontSize: 17,
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 15,
    paddingHorizontal: 24,
  },
  identity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    marginTop: 16,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#CDEEDC',
    borderRadius: 40,
    height: 76,
    justifyContent: 'center',
    width: 76,
  },
  avatarText: {
    color: '#263A32',
    fontSize: 26,
    fontWeight: '600',
  },
  identityCopy: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: '#263A32',
    fontSize: 24,
    fontWeight: '400',
  },
  location: {
    color: '#7D8983',
    fontSize: 12,
  },
  editButton: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
  },
  editText: {
    color: '#263A32',
    fontSize: 12,
  },
  verifiedCard: {
    backgroundColor: '#EDF1E9',
    borderRadius: 18,
    marginBottom: 20,
    padding: 16,
  },
  verifiedTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  verifiedTitle: {
    color: '#34433D',
    fontSize: 14,
  },
  verifiedCopy: {
    color: '#7D8983',
    fontSize: 12,
    marginTop: 13,
  },
  verificationList: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 9,
  },
  verificationItem: {
    color: '#315E4A',
    fontSize: 11,
    fontWeight: '600',
  },
  linkList: {
    marginTop: 1,
  },
  linkRow: {
    alignItems: 'center',
    borderBottomColor: '#DDE2DA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 12,
    minHeight: 64,
    paddingVertical: 8,
  },
  lastLinkRow: {
    borderBottomWidth: 0,
  },
  linkIcon: {
    alignItems: 'center',
    backgroundColor: '#EDF1E9',
    borderRadius: 13,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  linkCopy: {
    flex: 1,
    gap: 3,
  },
  linkTitle: {
    color: '#34433D',
    fontSize: 14,
  },
  linkSubtitle: {
    color: '#7D8983',
    fontSize: 11,
  },
  logoutButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    marginTop: 13,
    minHeight: 42,
  },
  logoutText: {
    color: '#263A32',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    color: '#7D8983',
    fontSize: 9,
    marginTop: 7,
    textAlign: 'center',
  },
});
