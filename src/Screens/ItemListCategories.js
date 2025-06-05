import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../components/ProductItem.js';
import allProducts from '../data/products.json';
import { COLORS } from '../theme/colors.js';
import HeaderLayout from '../components/HeaderLayout.js';

import { setProducts, filterProductsByCategory } from '../redux/slices/productSlice.js';

const ItemListCategories = ({ route }) => {
  const dispatch = useDispatch();
  const { category } = route.params || {};

  const filteredProducts = useSelector((state) => state.product.filteredProducts);
  const all = useSelector((state) => state.product.products);

  useEffect(() => {
    if (!all || all.length === 0 || category === 'Productos') {
      dispatch(setProducts(allProducts));
    }
    if (category) {
      dispatch(filterProductsByCategory(category));
    }
  }, [category]);

  return (
    <HeaderLayout title={category || 'Productos'}>
      <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
        <FlatList
          data={filteredProducts.length > 0 ? filteredProducts : all}
          renderItem={({ item }) => <ProductItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    </HeaderLayout>
  );
};

export default ItemListCategories;
