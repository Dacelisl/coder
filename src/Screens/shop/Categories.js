import { StyleSheet, View, FlatList } from 'react-native';
import React from 'react';
import CategoryItem from '../../components/CategoryItem.js';
import { COLORS } from '../../theme/colors.js';
import { useGetCategoriesQuery } from '../../services/shopService.js';

const Categories = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
      {error ? (
        <>
          <Text style={styles.emptyText}>Oh no, there was an error</Text>
        </>
      ) : isLoading ? (
        <>
          <Text style={styles.emptyText}>Loading...</Text>
        </>
      ) : data ? (
        <>
          <FlatList
            data={data}
            renderItem={({ item }) => <CategoryItem category={item.name} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 10 }}
          />
        </>
      ) : null}
    </View>
  );
};

export default Categories;
const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.text,
  },
});
