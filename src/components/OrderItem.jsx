import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ order }) => {
  const navigation = useNavigation();
  const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <Pressable
      onPress={() => navigation.navigate('OrderHistory', { order })}
      style={styles.container}
    >
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.amount}>Total: ${order.totalAmount.toFixed(2)}</Text>
      <Text style={styles.items}>Ver detalles</Text>
    </Pressable>
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
  itemsDetail: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textLight,
  },
});
