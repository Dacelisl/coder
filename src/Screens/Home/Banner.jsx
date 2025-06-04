// screens/Home/Banner.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import splachScreen from '../../../assets/images/splachScreen.jpg';

const Banner = () => {
  return (
    <View style={styles.container}>
      <Image source={splachScreen} style={styles.image} resizeMode="cover" />
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
    height: 120,
    width: '100%',
  },
  text: {
    position: 'absolute',
    top: 12,
    left: 16,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
