import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PaymentForm from '@presentational/payment/PaymentForm';
import { paymentLoader } from '@slice';
import { addPayment, deletePayment, updatePayment } from '@service/api';

const PaymentContainer = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments);
  const changeStatus = () => {
    dispatch(
      // TODO: 추후 로그인 기능이 완료되면, localStorage에서 정보 가져올 예정
      paymentLoader({
        userId: '5fbe261bf9266857e4dd7c3f',
        accountBookId: '5fc46c4209dfb476c8bac16d',
      })
    );
  };

  useEffect(() => {
    changeStatus();
  }, []);

  const handleClick = async ({ userId, paymentName }) => {
    const addResult = await addPayment({
      userId,
      paymentName,
    });

    if (addResult === 'success') {
      changeStatus();
    }
  };

  const cardDelete = async ({ paymentName }) => {
    const deleteResult = await deletePayment({
      userId: '5fbe261bf9266857e4dd7c3f',
      paymentName,
    });

    if (deleteResult === 'success') {
      changeStatus();
    }
  };

  const cardUpdate = async ({ selectedCardName, newCardName }) => {
    const deleteResult = await updatePayment({
      userId: '5fbe261bf9266857e4dd7c3f',
      selectedCardName,
      newCardName,
    });

    if (deleteResult === 'success') {
      changeStatus();
    }
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
