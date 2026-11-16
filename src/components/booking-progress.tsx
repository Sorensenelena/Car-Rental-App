import { StyleSheet, Text, View } from 'react-native';

const steps = ['Details', 'Payment', 'Confirmed'];

type Props = {
  activeStep: 1 | 2 | 3;
};

export default function BookingProgress({ activeStep }: Props) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`Booking progress, step ${activeStep} of 3: ${steps[activeStep - 1]}`}
      style={styles.container}
    >
      <View style={styles.indicatorRow}>
        {steps.map((step, index) => {
          const isComplete = index + 1 <= activeStep;

          return (
            <View
              key={step}
              style={[
                styles.indicator,
                isComplete ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          );
        })}
      </View>
      <View style={styles.labelRow}>
        {steps.map((step, index) => {
          const isActive = index + 1 === activeStep;

          return (
            <Text
              key={step}
              style={[styles.label, isActive && styles.activeLabel]}
            >
              {index + 1} {step}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
    marginBottom: 15,
  },
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  indicator: {
    borderRadius: 2,
    flex: 1,
    height: 4,
  },
  activeIndicator: {
    backgroundColor: '#203F36',
  },
  inactiveIndicator: {
    backgroundColor: '#DDE2DA',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#7D8983',
    fontSize: 10,
  },
  activeLabel: {
    color: '#203F36',
    fontWeight: '700',
  },
});
