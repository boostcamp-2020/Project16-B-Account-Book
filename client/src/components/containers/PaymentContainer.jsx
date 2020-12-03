import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PaymentForm from '@presentational/payment/PaymentForm';
import { loadPayment, addPayment, removePayment, changePayment } from '@slice';

const PaymentContainer = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(
      // TODO: 추후 로그인 기능이 완료되면, localStorage에서 정보 가져올 예정
      loadPayment({
        userId: '5fbe261bf9266857e4dd7c3f',
        accountBookId: '5fc713abd120a78e5c18216d',
      })
    );
  }, []);

  const handleClick = ({ userId, paymentName }) => {
    dispatch(addPayment({ userId, paymentName }));
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
