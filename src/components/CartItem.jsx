import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';
import { COLORS } from '../theme/colors';

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{cartItem.name}</Text>
        <Text style={styles.price}>Precio unitario: ${cartItem.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>Cantidad: {cartItem.quantity}</Text>
        <Text style={styles.subtotal}>
          Subtotal: ${(cartItem.price * cartItem.quantity).toFixed(2)}
        </Text>
        <View style={styles.actions}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => dispatch(decreaseQuantity(cartItem.id))}
          >
            <Ionicons name="remove-circle-outline" size={22} color={COLORS.shadow} />
          </Pressable>
          <Pressable
            style={styles.quantityButton}
            onPress={() => dispatch(increaseQuantity(cartItem.id))}
          >
            <Ionicons name="add-circle-outline" size={22} color={COLORS.shadow} />
          </Pressable>
        </View>
      </View>

      <Pressable onPress={() => dispatch(removeFromCart(cartItem.id))}>
        <Ionicons name="trash-outline" size={24} color={COLORS.shadow} />
      </Pressable>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
    marginVertical: 5,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  price: {
    fontSize: 14,
    color: COLORS.text,
  },
  quantity: {
    fontSize: 14,
    color: COLORS.text,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  quantityButton: {
    padding: 4,
  },
});
