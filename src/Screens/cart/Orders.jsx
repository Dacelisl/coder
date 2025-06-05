import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import OrderItem from '../../components/OrderItem';

const Orders = ({ orders }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItem order={item} />}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
