// components/CustomDrawer.js
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import CATEGORIES from '../data/categories.json';
import { COLORS } from '../theme/colors';

const screenWidth = Dimensions.get('window').width;

const CustomDrawer = ({ visible, onClose, navigation }) => {
  const translateX = React.useRef(new Animated.Value(-screenWidth)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -screenWidth,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
          <Text style={styles.title}>Categorías</Text>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={styles.item}
              onPress={() => {
                navigation.navigate('ItemListCategories', { category: cat.name });
                onClose(); // cerrar el drawer
              }}
            >
              <Text style={styles.text}>{cat.name}</Text>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 100,
  },
  drawer: {
    width: screenWidth * 0.7,
    height: '100%',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
  },
});
