import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
      };
      state.orders.push(newOrder);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
