import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import OrderDetailItem from '../../components/OrderDetailItem.jsx';
import { COLORS } from '../../theme/colors';

const OrderHistory = ({ route, navigation }) => {
  const { order } = route.params;

  if (!order) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No se encontró la orden</Text>
      </View>
    );
  }

  const total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderDetailItem item={item} />}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.total}>Total pagado: ${total.toFixed(2)}</Text>
      </View>

      <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 24 }}>
        <Text style={styles.goBackText}>
          <Ionicons name="arrow-back" size={20} /> Volver atrás
        </Text>
      </Pressable>
    </View>
  );
};

export default OrderHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryLighter,
    padding: 16,
    paddingTop: 30,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: COLORS.card,
    paddingVertical: 12,
    marginTop: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  goBack: {
    marginTop: 30,
  },
  goBackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
