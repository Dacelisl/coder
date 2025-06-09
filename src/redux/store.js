import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { shopService } from '../services/shopService';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [shopService.reducerPath]: shopService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopService.middleware),
});
