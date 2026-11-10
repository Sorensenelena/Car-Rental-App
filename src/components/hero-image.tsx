import { ReactNode } from 'react';
import { ImageBackground, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function HeroImage({ children, style }: Props) {
  return (
    <ImageBackground
      source={require('@/assets/images/placeholder.png')}
      resizeMode="cover"
      style={[styles.image, style]}
      imageStyle={styles.imageCorners}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  imageCorners: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
