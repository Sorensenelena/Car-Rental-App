import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BrandMark from '@/components/brand-mark';
import FeaturePill from '@/components/feature-pill';
import HeroImage from '@/components/hero-image';
import WelcomeActionButton from '@/components/welcome-action-button';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

export default function StartScreen({ navigation }: Props) {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const heroHeight = Math.min(390, Math.max(220, height * 0.4));

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { minHeight: height - insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <HeroImage style={[styles.hero, { height: heroHeight }]}>
          <View style={[styles.heroHeader, { paddingTop: Math.max(42, height * 0.075) }]}>
            <BrandMark />
          </View>
          <FeaturePill text="100% electric. A little more freedom." />
        </HeroImage>

        <View style={styles.content}>
          <Text style={[styles.title, { fontSize: Math.min(36, Math.max(30, width * 0.09)) }]}>
            Less footprint.{'\n'}More adventure.
          </Text>
          <Text style={styles.description}>
            Rent an electric car from someone nearby. Your next good day starts here.
          </Text>

          <View style={styles.actions}>
            <WelcomeActionButton
              title="Log in"
              variant="primary"
              onPress={() => navigation.navigate('Login')}
            />
            <WelcomeActionButton
              title="Sign up"
              variant="secondary"
              onPress={() => navigation.navigate('Signup')}
            />
            <WelcomeActionButton
              title="Continue as guest  →"
              variant="link"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F7F1',
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroHeader: {
    gap: 24,
  },
  hero: {
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 8,
  },
  title: {
    color: '#203F36',
    fontWeight: '400',
    letterSpacing: -0.8,
    lineHeight: 39,
  },
  description: {
    color: '#7C8883',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 22,
  },
  actions: {
    marginTop: 'auto',
    gap: 8,
  },
});
