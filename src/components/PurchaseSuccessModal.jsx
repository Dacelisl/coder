import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const PurchaseSuccessModal = ({ visible, onClose }) => {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Ionicons name="checkmark-circle-outline" size={64} color={COLORS.success} />
          <Text style={styles.title}>¡Compra realizada con éxito!</Text>
          <Text style={styles.message}>
            Gracias por tu compra. Puedes consultar tu historial en la sección de órdenes.
          </Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default PurchaseSuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: COLORS.text,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.success,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
});
