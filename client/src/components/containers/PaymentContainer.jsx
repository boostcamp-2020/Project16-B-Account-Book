import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PaymentForm from '@presentational/payment/PaymentForm';
import {
  loadPayment,
  addPayment,
  removePayment,
  changePayment,
} from '@paymentSlice';

const PaymentContainer = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.payments);


  useEffect(() => {
    dispatch(loadPayment());
  }, []);

  const handleClick = ({ paymentName }) => {
    dispatch(addPayment({ paymentName }));
  };

  const cardDelete = ({ paymentName }) => {
    dispatch(removePayment({ paymentName }));
  };

  const cardUpdate = ({ selectedCardName, newCardName }) => {
    dispatch(changePayment({ selectedCardName, newCardName }));
  };

  return (
    <PaymentForm
      payments={payments}
      addClick={handleClick}
      cardDelete={cardDelete}
      cardUpdate={cardUpdate}
    />
  );
};

export default PaymentContainer;
