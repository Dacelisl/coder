import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], // [{ id, name, price, image, category }]
  filteredProducts: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    filterProductsByCategory: (state, action) => {
      const category = action.payload;
      state.filteredProducts = state.products.filter((product) => product.category === category);
    },

    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    clearProductSelection: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setProducts, filterProductsByCategory, selectProduct, clearProductSelection } =
  productSlice.actions;
export default productSlice.reducer;
