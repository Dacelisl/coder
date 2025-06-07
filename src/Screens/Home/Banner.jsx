import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import cyber from '../../../assets/images/cyber.jpg'; // Adjust the path as necessary
import { COLORS } from '../../../src/theme/colors';
import { useUserCity } from '../../hooks/useUserCity';

const Banner = () => {
  const { city } = useUserCity();
  return (
    <View style={styles.container}>
      <Image source={cyber} style={styles.image} resizeMode="cover" />
      <Text style={styles.text1}>¡SOLO HOY </Text>
      <Text style={styles.text}>Envio Gratis a {city}!</Text>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  image: {
    height: 100,
    width: '100%',
  },
  text1: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    color: COLORS.textOnPrimary,
    fontSize: 18,
    fontWeight: 'condensedBold',
  },
  text: {
    position: 'absolute',
    bottom: 3,
    left: 15,
    color: COLORS.textOnPrimary,
    fontSize: 18,
    fontWeight: 'condensedBold',
  },
});
