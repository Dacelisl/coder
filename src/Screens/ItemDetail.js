import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header.js';
import { COLORS } from '../theme/colors.js';

const ItemDetail = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View>
      {/*  <View style={{ alignContent: 'space-between', height: 60, width: '100%' }}>
        <Header title={'Detail'} />
      </View> */}

      <Pressable
        style={{ backgroundColor: COLORS.secondaryLighter }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ marginLeft: 20, marginVertical: 1, fontSize: 16 }}>Go Back</Text>
      </Pressable>

      <View style={styles.container}>
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
      </View>
    </View>
  );
};

export default ItemDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
