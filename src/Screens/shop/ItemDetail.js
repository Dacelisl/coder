import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet, Image, View } from 'react-native';
import HeaderLayout from '../../components/HeaderLayout.js';
import { COLORS } from '../../theme/colors.js';

const ItemDetail = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <HeaderLayout title={product.name}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('ConfirmPurchaseModal', { product })}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </ScrollView>
    </HeaderLayout>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundImage,
  },
  detailsContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 6,
  },
  price: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textOnPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
