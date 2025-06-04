import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from '../Screens/ItemDetail.js';
import ItemListCategories from '../Screens/ItemListCategories.js';
import ConfirmPurchaseModal from '../Screens/Modal/ConfirmPurchaseModal .jsx';

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ItemListCategories" component={ItemListCategories} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
      <Stack.Screen name="ConfirmPurchaseModal" component={ConfirmPurchaseModal} />
    </Stack.Navigator>
  );
};
export default ShopStack;
