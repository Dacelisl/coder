import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const ICONS = {
  success: { name: 'checkmark-circle-outline', color: COLORS.success },
  error: { name: 'close-circle-outline', color: COLORS.error },
  warning: { name: 'warning-outline', color: COLORS.warning },
  info: { name: 'information-circle-outline', color: COLORS.info || COLORS.primary },
};

const AlertModal = ({
  visible,
  onClose,
  type = 'info', // success | error | warning | info
  title = '',
  message = '',
  buttonLabel = 'Aceptar',
}) => {
  const icon = ICONS[type] || ICONS.info;

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Ionicons name={icon.name} size={64} color={icon.color} />
          {title !== '' && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.message}>{message}</Text>
          <Pressable style={[styles.button, { backgroundColor: icon.color }]} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

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
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    color: COLORS.text,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
});
