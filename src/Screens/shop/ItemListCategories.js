import React from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import HeaderLayout from '../../components/HeaderLayout.js';
import ProductItem from '../../components/ProductItem.js';
import { COLORS } from '../../theme/colors.js';
import { useGetProductsQuery } from '../../services/shopService.js';

const ItemListCategories = ({ route }) => {
  const { category } = route.params || {};

  const { data: products, isLoading, error } = useGetProductsQuery();

  const productsToRender =
    category === 'Productos'
      ? products
      : products?.filter((product) => product.category === category);

  return (
    <HeaderLayout title={category || 'Productos'}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>Ocurrió un error al cargar los productos.</Text>
        ) : productsToRender?.length > 0 ? (
          <FlatList
            data={productsToRender}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.emptyText}>No hay productos disponibles en esta categoría.</Text>
        )}
      </View>
    </HeaderLayout>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: COLORS.text,
  },
  listContainer: {
    padding: 10,
  },
});
