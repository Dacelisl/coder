import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [], // [{ id, name }]
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setCategories, selectCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
