import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandMark from '@/components/brand-mark';
import FeaturePill from '@/components/feature-pill';
import HeroImage from '@/components/hero-image';
import WelcomeActionButton from '@/components/welcome-action-button';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

export default function StartScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <HeroImage style={styles.hero}>
        <View style={styles.heroHeader}>
          <BrandMark />
        </View>
        <FeaturePill text="100% electric. A little more freedom." />
      </HeroImage>

      <View style={styles.content}>
        <Text style={styles.title}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F7F1',
  },
  hero: {
    flexGrow: 0,
    flexShrink: 0,
    height: '46%',
  },
  heroHeader: {
    gap: 24,
    paddingTop: 64,
  },
  content: {
    flex: 1.04,
    minHeight: 0,
    paddingHorizontal: 28,
    paddingTop: 27,
    paddingBottom: 4,
  },
  title: {
    color: '#203F36',
    fontSize: 38,
    fontWeight: '400',
    letterSpacing: -1.2,
    lineHeight: 41,
  },
  description: {
    color: '#7C8883',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 62,
  },
  actions: {
    marginTop: 'auto',
    gap: 10,
  },
});
