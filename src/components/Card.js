import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/colors.js';

const Card = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryLight,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 1,
    shadowColor: COLORS.border,
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
