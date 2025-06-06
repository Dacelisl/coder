import React, { useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import { useGetCategoriesQuery } from '../services/shopService';
import { COLORS } from '../theme/colors';

const CustomDrawer = (props) => {
  const { navigation } = props;

  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);
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

      {error ? (
        <Text style={styles.emptyText}>Oh no, hubo un error al cargar las categorías.</Text>
      ) : isLoading ? (
        <Text style={styles.emptyText}>Cargando categorías...</Text>
      ) : (
        categories.map((category) => {
          const isSelected = category.name === selectedCategory;

          return (
            <Pressable
              key={category.id}
              onPress={() => handleCategoryPress(category.name)}
              style={[styles.item, isSelected && styles.selectedItem]}
            >
              <Text style={[styles.text, isSelected && styles.selectedText]}>{category.name}</Text>
            </Pressable>
          );
        })
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.surface,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  selectedItem: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
  },
  selectedText: {
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.text,
  },
});
