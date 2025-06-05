// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import ordersSlice from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    categories: categoryReducer,
    orders: ordersSlice,
  },
});
