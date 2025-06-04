// components/CustomDrawer.js
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import CATEGORIES from '../data/categories.json';
import { CommonActions } from '@react-navigation/native';

const CustomDrawer = (props) => {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categorías</Text>

      {CATEGORIES.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => {
            navigation.dispatch(
              CommonActions.navigate({
                name: 'RootTabs',
                params: {
                  screen: 'Shop', // Tab
                  params: {
                    screen: 'ItemListCategories', // Stack dentro del tab
                    params: { category: category.name },
                  },
                },
              }),
            );
          }}
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
