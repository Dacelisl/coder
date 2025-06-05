import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../components/ProductItem';
import HeaderLayout from '../components/HeaderLayout';
import { COLORS } from '../theme/colors';

import { setProducts } from '../redux/slices/productSlice';
import allProducts from '../data/products.json';

const SearchResultsScreen = ({ route, navigation }) => {
  const { keyword } = route.params;
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(setProducts(allProducts));
    } else {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredProducts(results);
    }
  }, [keyword, products]);

  return (
    <HeaderLayout title={`Resultados para "${keyword}"`}>
      <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
        {filteredProducts.length ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <ProductItem
                item={item}
                onPress={() => navigation.navigate('ItemDetail', { product: item })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 10 }}
          />
        ) : (
          <Text style={styles.empty}>No se encontraron resultados</Text>
        )}
      </View>
    </HeaderLayout>
  );
};

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.text,
  },
});

export default SearchResultsScreen;
