import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerChangeEvent } from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '@/components/bottom-bar';
import BrandMark from '@/components/brand-mark';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DateTarget = 'start' | 'end';

type RentalDateFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  onOpenPicker: () => void;
};

function RentalDateField({
  label,
  value,
  placeholder,
  onChangeText,
  onOpenPicker,
}: RentalDateFieldProps) {
  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          accessibilityLabel={label}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7C8883"
          keyboardType={isWeb ? 'numbers-and-punctuation' : 'default'}
          maxLength={isWeb ? 10 : undefined}
          editable={isWeb}
        />
        {!isWeb && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Choose ${label.toLowerCase()}`}
            hitSlop={8}
            onPress={onOpenPicker}
            style={styles.dateButton}
          >
            <Ionicons name="calendar-outline" size={20} color="#25332F" />
          </Pressable>
        )}
        {isWeb && <Ionicons name="calendar-outline" size={20} color="#25332F" />}
      </View>
    </View>
  );
}

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  const date = parseDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export default function HomeScreen({ navigation }: Props) {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [pickerTarget, setPickerTarget] = useState<DateTarget | null>(null);
  const locationInput = useRef<TextInput>(null);

  const updateStartDate = (value: string) => {
    setStartDate(value);
    if (endDate && value && endDate < value) setEndDate('');
    setError('');
  };

  const updateEndDate = (value: string) => {
    setEndDate(value);
    setError('');
  };

  const onDateChange = (_event: DateTimePickerChangeEvent, date: Date) => {
    if (pickerTarget === 'start') {
      updateStartDate(toDateValue(date));
    } else {
      updateEndDate(toDateValue(date));
    }
    setPickerTarget(null);
  };

  const search = () => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    if (!start || !end) {
      setError('Choose a valid start and end date.');
      return;
    }
    if (end < start) {
      setError('End date must be on or after the start date.');
      return;
    }

    setError('');
    navigation.navigate('SearchResults', {
      location: location.trim(),
      startDate,
      endDate,
    });
  };

  const pickerValue = parseDate(pickerTarget === 'start' ? startDate : endDate) ?? new Date();
  const minimumDate = pickerTarget === 'end' ? parseDate(startDate) ?? undefined : new Date();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <BrandMark style={styles.brand} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.eyebrow}>HEJ EMMA, WHERE TO?</Text>
        <Text style={styles.title}>A car nearby.{'\n'}A day your way.</Text>

        <View style={styles.bookingCard}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Pickup location</Text>
            <View style={styles.inputRow}>
              <TextInput
                ref={locationInput}
                accessibilityLabel="Pickup location"
                style={styles.input}
                value={location}
                onChangeText={(value) => {
                  setLocation(value);
                  setError('');
                }}
                placeholder="City, neighborhood"
                placeholderTextColor="#7C8883"
                autoCapitalize="words"
                returnKeyType="next"
              />
              <Ionicons name="location-outline" size={20} color="#25332F" />
            </View>
          </View>

          <RentalDateField
            label="Start rental"
            value={Platform.OS === 'web' ? startDate : formatDate(startDate)}
            placeholder={Platform.OS === 'web' ? 'YYYY-MM-DD' : 'Choose pickup date'}
            onChangeText={updateStartDate}
            onOpenPicker={() => setPickerTarget('start')}
          />

          <RentalDateField
            label="End rental"
            value={Platform.OS === 'web' ? endDate : formatDate(endDate)}
            placeholder={Platform.OS === 'web' ? 'YYYY-MM-DD' : 'Choose return date'}
            onChangeText={updateEndDate}
            onOpenPicker={() => setPickerTarget('end')}
          />

          {pickerTarget && Platform.OS !== 'web' && (
            <DateTimePicker
              value={pickerValue}
              mode="date"
              minimumDate={minimumDate}
              onValueChange={onDateChange}
              onDismiss={() => setPickerTarget(null)}
              accentColor="#203F36"
            />
          )}

          {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}

          <Pressable
            accessibilityRole="button"
            onPress={search}
            style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}
          >
            <Text style={styles.searchButtonText}>Find an electric car</Text>
          </Pressable>

          <View style={styles.insurance}>
            <Ionicons name="shield-checkmark-outline" size={14} color="#315E4A" />
            <Text style={styles.insuranceText}>Insurance included on every trip</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => locationInput.current?.focus()}
          style={({ pressed }) => [styles.promoCard, pressed && styles.pressed]}
        >
          <View style={styles.promoCopy}>
            <Text style={styles.promoTitle}>Make room for a little escape.</Text>
            <Text style={styles.promoLink}>Find your weekend →</Text>
          </View>
          <ImageBackground
            source={require('@/assets/images/placeholder.png')}
            resizeMode="cover"
            style={styles.promoImage}
            imageStyle={styles.promoImageStyle}
            accessibilityLabel="Scenic road placeholder image"
          />
        </Pressable>
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F8F7F1',
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 57,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  brand: {
    marginHorizontal: 0,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 8,
    paddingHorizontal: 23,
    paddingTop: 27,
  },
  eyebrow: {
    color: '#7C8883',
    fontSize: 11,
    letterSpacing: 0.3,
    marginBottom: 10,
  },
  title: {
    color: '#203F36',
    fontSize: 33,
    fontWeight: '400',
    letterSpacing: -0.8,
    lineHeight: 39,
    marginBottom: 21,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E4DC',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingTop: 17,
    paddingBottom: 13,
  },
  field: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: '#2A3D36',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
  },
  inputRow: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE1D9',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 52,
    paddingHorizontal: 13,
  },
  input: {
    color: '#263A33',
    flex: 1,
    fontSize: 14,
    minHeight: 50,
    paddingVertical: 0,
  },
  dateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    width: 26,
  },
  error: {
    color: '#A7372D',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 10,
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#203F36',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    marginTop: 1,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  insurance: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 14,
  },
  insuranceText: {
    color: '#818B86',
    fontSize: 11,
  },
  promoCard: {
    backgroundColor: '#D1EFDF',
    borderRadius: 20,
    flexDirection: 'row',
    height: 136,
    marginTop: 'auto',
    overflow: 'hidden',
  },
  promoCopy: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  promoTitle: {
    color: '#203F36',
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 8,
  },
  promoLink: {
    color: '#29473D',
    fontSize: 12,
    fontWeight: '600',
  },
  promoImage: {
    flexShrink: 0,
    height: '100%',
    width: '47%',
  },
  promoImageStyle: {
    borderBottomRightRadius: 20,
    height: '100%',
    borderTopRightRadius: 20,
    width: '100%',
  },
  pressed: {
    opacity: 0.82,
  },
});
