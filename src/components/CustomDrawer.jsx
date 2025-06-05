import React, { useEffect } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setCategories, selectCategory } from '../redux/slices/categorySlice';
import CATEGORIES from '../data/categories.json';

const CustomDrawer = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(setCategories(CATEGORIES));
    }
  }, [categories, dispatch]);

  const handleCategoryPress = (categoryName) => {
    dispatch(selectCategory(categoryName));
    navigation.dispatch(
      CommonActions.navigate({
        name: 'RootTabs',
        params: {
          screen: 'Shop',
          params: {
            screen: 'ItemListCategories',
            params: { category: categoryName },
          },
        },
      }),
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categorías</Text>

      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => handleCategoryPress(category.name)}
          style={styles.item}
        >
          <Text style={styles.text}>{category.name}</Text>
        </Pressable>
      ))}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  item: {
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
});
