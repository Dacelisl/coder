import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import CartItem from '../../components/CartItem';
import PurchaseSuccessModal from '../../components/PurchaseSuccessModal';
import AlertModal from '../../components/AlertModal';

import { clearCart } from '../../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../../services/shopService';
import { COLORS } from '../../theme/colors';

const Cart = () => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const openModal = () => {
    navigation.navigate('Login');
    setAlertVisible(false);
  };

  const handleConfirmOrder = async () => {
    if (!user) {
      setAlertVisible(true);
      return;
    }

    try {
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

  const renderCartItem = ({ item }) => <CartItem cartItem={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Tu carrito está vacío</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {cartItems.length > 0 && (
        <>
          <View style={styles.summaryContainer}>
            <Text style={styles.label}>Total a pagar:</Text>
            <Text style={styles.total}>${total.toFixed(2)}</Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, isLoading && styles.disabled]}
              onPress={handleConfirmOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.textOnPrimary} />
              ) : (
                <Text style={styles.buttonText}>Confirmar</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.goBack}
              onPress={() => {
                navigation.navigate('Shop', { screen: 'Home' });
              }}
            >
              <Text style={styles.goBackText}>
                <Ionicons name="arrow-back-outline" size={20} color={COLORS.primary} /> Volver a
                tienda
              </Text>
            </Pressable>
          </View>
        </>
      )}

      <PurchaseSuccessModal visible={successVisible} onClose={() => setSuccessVisible(false)} />

      <AlertModal
        visible={alertVisible}
        onClose={openModal}
        type="info"
        title="¡Regístrate!"
        message="Necesitas estar registrado para completar tu compra."
        buttonLabel="Aceptar"
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
    paddingTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.text,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: COLORS.card,
    paddingVertical: 12,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  actions: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 6,
    width: '70%',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.textOnPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBack: {
    marginTop: 30,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
