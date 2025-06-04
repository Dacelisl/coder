// screens/Modal/ConfirmPurchaseModal.jsx
import React, { useState } from 'react';
import PurchaseModalContent from '../../components/PurchaseModalContent.js';

const ConfirmPurchaseModal = ({ route, navigation }) => {
  const { product } = route.params;
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    navigation.goBack();
  };

  const handleConfirm = (quantity) => {
    // Aquí puedes hacer lo que necesites con la cantidad seleccionada
    console.log('Producto confirmado:', product.name, 'Cantidad:', quantity);
    handleClose();
  };

  return (
    <PurchaseModalContent
      product={product}
      visible={visible}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
};

export default ConfirmPurchaseModal;
