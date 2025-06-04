import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import Header from '../components/Header.js';
import ProductItem from '../components/ProductItem.js';
import Search from '../components/Search.js';
import allProducts from '../data/products.json';
import { COLORS } from '../theme/colors.js';

const ItemListCategories = ({ navigation, route }) => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);

  const { category } = route.params || {};

  useEffect(() => {
    if (category) {
      const products = allProducts.filter((product) => product.category === category);
      const filteredProducts = products.filter((product) => product.name.includes(keyword));
      setProducts(filteredProducts);
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(keyword),
      );
      setProducts(filteredProducts);
    }
  }, [category, keyword]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
        {/* <View style={{ alignContent: 'space-between', width: '100%' }}>
          <Header title={category || 'Products'} />
          <Search onSearch={setKeyword} />
        </View> */}
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    </>
  );
};

export default ItemListCategories;
