import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={28} color={COLORS.textOnPrimary} />
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
    marginLeft: 30,
  },
  menuIcon: {
    marginTop: 5,
    marginLeft: 10,
  },
});
