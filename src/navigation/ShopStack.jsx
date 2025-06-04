import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from '../Screens/ItemDetail.js';
import ItemListCategories from '../Screens/ItemListCategories.js';
import Home from '../Screens/Home/Home.js';
import SearchResultsScreen from '../Screens/SearchResultsScreen .jsx';
import ConfirmPurchaseModal from '../Screens/Modal/ConfirmPurchaseModal .jsx';

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeStack" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ItemListCategories" component={ItemListCategories} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
      <Stack.Screen name="ConfirmPurchaseModal" component={ConfirmPurchaseModal} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
    </Stack.Navigator>
  );
};
export default ShopStack;
