import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useGetProductsQuery } from '../services/shopService';
import ProductItem from '../components/ProductItem';
import HeaderLayout from '../components/HeaderLayout';
import { COLORS } from '../theme/colors';

const SearchResultsScreen = ({ route, navigation }) => {
  const { keyword } = route.params;
  const { data: products, isLoading, error } = useGetProductsQuery();

  const filteredProducts =
    products?.filter((product) => product.name.toLowerCase().includes(keyword.toLowerCase())) || [];

  return (
    <HeaderLayout title={`Resultados para "${keyword}"`}>
      <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
        {error ? (
          <Text style={styles.empty}>Ocurrió un error al cargar los productos</Text>
        ) : isLoading ? (
          <Text style={styles.empty}>Cargando productos...</Text>
        ) : filteredProducts.length > 0 ? (
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
