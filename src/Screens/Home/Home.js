import React from 'react';
import { Text, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderLayout from '../../components/HeaderLayout ';
import ProductItem from '../../components/ProductItem';
import Banner from './Banner';
import allProducts from '../../data/products.json';
import { COLORS } from '../../theme/colors';

const Home = () => {
  const navigation = useNavigation();

  return (
    <HeaderLayout title="Bienvenido 👋">
      <FlatList
        data={allProducts.slice(0, 4)}
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
            onPress={() => navigation.navigate('ItemListCategories')}
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
