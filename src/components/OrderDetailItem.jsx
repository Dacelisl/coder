import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../theme/colors';

const OrderDetailItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} resizeMode="stretch" />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Precio unitario: ${item.price.toFixed(2)}</Text>
      <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
      <Text style={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  </View>
);

export default OrderDetailItem;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 6,
    marginVertical: 5,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    marginRight: 4,
    backgroundColor: COLORS.backgroundImage,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  price: {
    fontSize: 14,
    color: COLORS.text,
  },
  quantity: {
    fontSize: 14,
    color: COLORS.text,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginVertical: 4,
  },
});
