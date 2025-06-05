import { StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryItem from '../components/CategoryItem.js';
import { COLORS } from '../theme/colors.js';

import { setCategories } from '../redux/slices/categorySlice';
import CATEGORIES from '../data/categories.json';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(setCategories(CATEGORIES));
    }
  }, [categories, dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem category={item.name} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default Categories;
