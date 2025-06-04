import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import Card from './Card';
import { COLORS } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ category }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('ItemListCategories', { category })}
      style={styles.container}
    >
      <Card style={styles.cardContainer}>
        <Text style={styles.tex}>{category}</Text>
      </Card>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 5,
    marginVertical: 6,
  },
  cardContainer: {
    marginVertical: 3,
    padding: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tex: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 2,
  },
});
