import { StyleSheet, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/colors.js';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { product: item })}
    >
      <Text style={styles.text}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    backgroundColor: COLORS.backgroundImage,
  },
});
