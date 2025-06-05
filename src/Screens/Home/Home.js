import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import HeaderLayout from '../../components/HeaderLayout';
import ProductItem from '../../components/ProductItem';
import Banner from './Banner';
import { COLORS } from '../../theme/colors';

import allProducts from '../../data/products.json';
import { setProducts } from '../../redux/slices/productSlice';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(setProducts(allProducts));
    }
  }, []);

  const featured = products.slice(0, 4);

  return (
    <HeaderLayout title="Bienvenido 👋">
      <FlatList
        data={featured}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onPress={() => navigation.navigate('ItemDetail', { product: item })}
          />
        )}
        ListHeaderComponent={
          <View>
            <Banner />
            <Text style={styles.title}>Productos destacados</Text>
          </View>
        }
        ListFooterComponent={
          <Pressable
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate('ItemListCategories', { category: 'Productos' })}
          >
            <Text style={styles.seeMoreText}>Ver todos los productos</Text>
          </Pressable>
        }
        contentContainerStyle={styles.scrollContainer}
      />
    </HeaderLayout>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 5,
    marginBottom: 2,
  },
  seeMoreButton: {
    marginVertical: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  seeMoreText: {
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
});
