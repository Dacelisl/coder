import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../../components/CartItem';
import PurchaseSuccessModal from '../../components/PurchaseSuccessModal';
import AlertModal from '../../components/AlertModal';
import { COLORS } from '../../theme/colors';

import { clearCart } from '../../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../../services/shopService';

const Cart = () => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [createOrder, { isLoading, isSuccess, isError }] = useCreateOrderMutation();

  const handleConfirmOrder = async () => {
    try {
      console.log('user', user);

      if (!user) {
        setModalVisible(true);
        return;
      }
      await createOrder({
        items: cartItems,
        totalAmount: total,
        createdAt: new Date().toISOString(),
      }).unwrap();
      dispatch(clearCart());
      setSuccessVisible(true);
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
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
          <Pressable onPress={handleConfirmOrder} disabled={isLoading}>
            <Text style={[styles.confirmText, isLoading && { opacity: 0.5 }]}>
              {isLoading ? 'Procesando...' : 'Confirmar'}
            </Text>
          </Pressable>
          <Text style={styles.confirmText}>Total: ${total.toFixed(2)}</Text>
        </View>
      )}

      <PurchaseSuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)} />
      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        type="info"
        title="Registrese!"
        message="Registrese para continuar con la compra ."
        buttonLabel="Aeptar"
      />
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
