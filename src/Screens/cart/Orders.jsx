// src/screens/Orders.jsx
import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/OrderItem';
import { COLORS } from '../../theme/colors';

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Órdenes</Text>
      {orders.length === 0 ? (
        <Text style={styles.empty}>No hay órdenes registradas.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 20,
  },
  empty: {
    fontSize: 16,
    color: COLORS.text,
  },
});
