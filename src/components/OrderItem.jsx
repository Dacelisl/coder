// src/components/OrderItem.jsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/colors';

const OrderItem = ({ order }) => {
  const formattedDate = new Date(order.date).toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.amount}>Total: ${order.totalAmount.toFixed(2)}</Text>
      <Text style={styles.items}>Artículos: {order.items.length}</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryLighter,
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: COLORS.text,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  items: {
    fontSize: 14,
    color: COLORS.text,
  },
});
