import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../Screens/cart/Orders.jsx';
import OrderHistory from '../Screens/cart/OrderHistory.jsx';
const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
    </Stack.Navigator>
  );
};

export default OrderStack;
