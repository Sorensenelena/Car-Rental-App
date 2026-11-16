import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Car } from '../../types';

type Props = {
  car: Car;
  rentalDays: number;
  onPress: () => void;
};

export default function ElectricCarResultCard({ car, rentalDays, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${car.make} ${car.model}, ${car.pricePerDay} DKK per day`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.mainRow}>
        <Image
          source={require('../../assets/images/placeholder.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {car.make} {car.model}
          </Text>
          <View style={styles.detailRow}>
            <Ionicons name="flash" size={12} color="#315E4A" />
            <Text style={styles.detailText}>{car.year} · {car.color}</Text>
          </View>
          <Text style={styles.availability}>Available for your dates</Text>
        </View>
      </View>
      <View style={styles.priceRow}>
        <Text style={styles.totalPrice}>
          {car.pricePerDay * rentalDays} DKK total · {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
        </Text>
        <Text style={styles.dailyPrice}>{car.pricePerDay} DKK / day</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE4DD',
    borderRadius: 19,
    borderWidth: 1,
    marginBottom: 10,
    padding: 11,
  },
  pressed: {
    opacity: 0.82,
  },
  mainRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    backgroundColor: '#DDE2E2',
    borderRadius: 12,
    height: 88,
    width: 118,
  },
  details: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },
  title: {
    color: '#263A32',
    fontSize: 16,
    fontWeight: '500',
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  detailText: {
    color: '#7D8983',
    fontSize: 11,
  },
  availability: {
    color: '#7D8983',
    fontSize: 11,
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalPrice: {
    color: '#7D8983',
    fontSize: 11,
  },
  dailyPrice: {
    color: '#263A32',
    fontSize: 15,
    fontWeight: '700',
  },
});
