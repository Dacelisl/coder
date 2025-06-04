// screens/Home/Home.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Pressable } from 'react-native';
import Header from '../../components/Header';
import Search from '../../components/Search';
import ProductItem from '../../components/ProductItem.js';
import allProducts from '../../data/products.json';
import Banner from './Banner.jsx';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import CustomDrawer from '../../components/CustomDrawer.jsx';

const Home = () => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <>
      <View style={{ backgroundColor: COLORS.secondary, height: 130, width: '100%' }}>
        <Header title="Bienvenido 👋" />
        <Search onSearch={setKeyword} />
      </View>
      <ScrollView style={styles.container}>
        <Banner />
        <View style={styles.section}>
          <Text style={styles.title}>Productos destacados</Text>
          <FlatList
            horizontal
            data={filteredProducts.slice(0, 6)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductItem item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <Pressable
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate('ItemListCategories')}
        >
          <Text style={styles.seeMoreText}>Ver todos los productos</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
  },
  section: {
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  seeMoreButton: {
    marginVertical: 15,
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
