import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { COLORS } from '../../theme/colors';
import CartItem from '../../components/CartItem';
import PurchaseSuccessModal from '../../components/PurchaseSuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';
import { addOrder } from '../../redux/slices/ordersSlice';

const Cart = () => {
  const [successVisible, setSuccessVisible] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cart = useSelector((state) => state.cart);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    dispatch(
      addOrder({
        items: cart.items,
        totalAmount: cart.totalAmount,
      }),
    );
    dispatch(clearCart());
    setSuccessVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>Tu carrito está vacío</Text>}
      />
      {cartItems.length > 0 && (
        <View style={styles.confirmContainer}>
          <Pressable onPress={handleConfirmOrder}>
            <Text style={styles.confirmText}>Confirmar</Text>
          </Pressable>
          <Text style={styles.confirmText}>Total: ${total.toFixed(2)}</Text>
        </View>
      )}
      <PurchaseSuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryLighter,
    padding: 16,
    marginTop: 20,
  },
  list: {
    flexGrow: 0,
  },
  confirmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: COLORS.card,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.text,
  },
});
