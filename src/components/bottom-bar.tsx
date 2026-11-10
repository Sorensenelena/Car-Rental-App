import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../types';

type Props = {
  activeTab?: 'map' | 'profile';
};

export default function BottomBar({ activeTab }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const mapIsActive = activeTab === 'map' || route.name === 'Map';
  const profileIsActive = activeTab === 'profile' || route.name === 'Profile';

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Start');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.bar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={goBack}
          style={styles.sideButton}
        >
          <Ionicons name="arrow-back" size={21} color="#17221F" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Map view"
          accessibilityState={{ selected: mapIsActive }}
          onPress={() => navigation.navigate('Map')}
          style={[styles.mapButton, mapIsActive && styles.activeMapButton]}
        >
          <Ionicons
            name="map-outline"
            size={20}
            color={mapIsActive ? '#203F36' : '#17221F'}
          />
          <Text style={[styles.mapLabel, mapIsActive && styles.activeLabel]}>Map view</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          accessibilityState={{ selected: profileIsActive }}
          onPress={() => navigation.navigate('Profile')}
          style={styles.sideButton}
        >
          <Ionicons
            name="person-circle-outline"
            size={25}
            color={profileIsActive ? '#203F36' : '#17221F'}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E2E5DF',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  bar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 57,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sideButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 48,
  },
  mapButton: {
    alignItems: 'center',
    borderRadius: 22,
    flexDirection: 'row',
    gap: 8,
    height: 42,
    justifyContent: 'center',
    minWidth: 134,
    paddingHorizontal: 16,
  },
  activeMapButton: {
    backgroundColor: '#EAF3EC',
  },
  mapLabel: {
    color: '#25332F',
    fontSize: 14,
    fontWeight: '600',
  },
  activeLabel: {
    color: '#203F36',
  },
});
