import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, Modal, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

const PurchaseModalContent = ({ product, visible, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Confirmar compra</Text>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text style={styles.productName}>{product.name || 'Producto'}</Text>

          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={decrease} style={styles.qtyButton}>
              <Text style={styles.qtyButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increase} style={styles.qtyButton}>
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default PurchaseModalContent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.secondaryLighter,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  closeText: {
    fontSize: 20,
    color: COLORS.text,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.text,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
    resizeMode: 'contain',
    backgroundColor: COLORS.backgroundImage,
  },
  productName: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 16,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: COLORS.backgroundSelector,
    borderRadius: 15,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  qtyButton: {
    paddingHorizontal: 10,
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
    color: COLORS.text,
  },
  confirmButton: {
    backgroundColor: COLORS.success,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  confirmButtonText: {
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
