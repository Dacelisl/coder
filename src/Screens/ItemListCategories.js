import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ProductItem from '../components/ProductItem.js';
import allProducts from '../data/products.json';
import { COLORS } from '../theme/colors.js';
import HeaderLayout from '../components/HeaderLayout .js';

const ItemListCategories = ({ route }) => {
  const [products, setProducts] = useState([]);
  const { category } = route.params || {};

  useEffect(() => {
    const filteredProducts = allProducts.filter((product) => product.category === category);
    setProducts(filteredProducts);
  }, []);

  return (
    <>
      <HeaderLayout title={category || 'Productos'}>
        <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
          <FlatList
            data={products.length > 0 ? products : allProducts}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 10 }}
          />
        </View>
      </HeaderLayout>
    </>
  );
};

export default ItemListCategories;
