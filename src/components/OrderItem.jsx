// src/components/OrderItem.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

const OrderItem = ({ order }) => {
  const { createdAt: date, totalAmount, items } = order;

  const formattedDate = date ? new Date(date).toLocaleString() : 'Fecha no disponible';

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.itemsDetail}>
        {items?.map((item) => `${item.name} x${item.quantity}`).join(', ')}
      </Text>
      <Text style={styles.items}>Artículos: {items?.length ?? 0}</Text>
      <Text style={styles.amount}>Total: ${Number(totalAmount).toFixed(2)}</Text>
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
  itemsDetail: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textLight,
  },
});
