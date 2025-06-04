import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Search from './Search';
import { COLORS } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const HeaderLayout = ({ children, title, onSearch }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Header title={title} />
        <Search onSearch={onSearch} navigation={navigation} />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default HeaderLayout;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  headerContainer: {
    backgroundColor: COLORS.secondary,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
