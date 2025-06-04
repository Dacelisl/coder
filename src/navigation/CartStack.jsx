import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../Screens/Cart.js';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartStack" component={Cart} />
    </Stack.Navigator>
  );
};

export default CartStack;

const styles = StyleSheet.create({});
