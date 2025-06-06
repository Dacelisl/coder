// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { shopService } from '../services/shopService';
import { authServiceRTK } from '../services/authServiceRTK';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [shopService.reducerPath]: shopService.reducer,
    [authServiceRTK.reducerPath]: authServiceRTK.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopService.middleware).concat(authServiceRTK.middleware),
});
