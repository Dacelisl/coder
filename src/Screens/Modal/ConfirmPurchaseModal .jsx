// screens/Modal/ConfirmPurchaseModal.jsx
import React, { useState } from 'react';
import PurchaseModalContent from '../../components/PurchaseModalContent.js';

import { addToCart } from '../../redux/slices/cartSlice.js';
import { useDispatch } from 'react-redux';

const ConfirmPurchaseModal = ({ route, navigation }) => {
  const { product } = route.params;
  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();

  const handleClose = () => {
    setVisible(false);
    navigation.goBack();
  };

  const handleConfirm = (quantity) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
    };
    dispatch(addToCart(productData));
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
