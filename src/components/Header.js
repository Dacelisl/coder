import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title, onMenuPress }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onMenuPress} style={styles.menuIcon}>
        <Ionicons name="menu" size={30} color="white" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 5,
    alignItems: 'center',
    height: 80,
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    zIndex: 50,
  },
  title: {
    color: COLORS.primary,
    fontFamily: 'Lobster-Regular',
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold',
    marginLeft: 60,
  },
  menuIcon: {
    marginTop: 5,
    marginLeft: 10,
  },
});
