// screens/Home/Banner.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import banner from '../../../assets/images/banner.jpg'; // Adjust the path as necessary
import { COLORS } from '../../../src/theme/colors';

const Banner = () => {
  return (
    <View style={styles.container}>
      <Image source={banner} style={styles.image} resizeMode="cover" />
      <Text style={styles.text}>¡Oferta limitada en productos naturales!</Text>
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
  text: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: 'condensedBold',
  },
});
