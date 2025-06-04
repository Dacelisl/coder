// components/DrawerToggle.js
import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrawerToggle = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ marginLeft: 10 }}>
      <Ionicons name="menu" size={28} color="white" />
    </Pressable>
  );
};

export default DrawerToggle;
