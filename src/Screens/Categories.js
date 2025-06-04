import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import CategoryItem from '../components/CategoryItem.js';
import CATEGORIES from '../data/categories.json';
import { COLORS } from '../theme/colors.js';
const Categories = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <FlatList
        data={CATEGORIES}
        renderItem={({ item }) => <CategoryItem category={item.name} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
