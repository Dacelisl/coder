import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
const OrderItem = ({ order }) => {
  const total = order.items.reduce((acc, item) => (acc += item.price * item.quantity), 0);
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{new Date(order.createAt).toLocaleString()}</Text>
        <Text style={styles.text2}>${total}</Text>
      </View>
      <Feather name="search" size={24} color={COLORS.shadow} />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textContainer: {
    width: '70%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  text2: {
    fontSize: 14,
    color: COLORS.text,
  },
});
