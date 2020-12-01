import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PaymentForm from '@presentational/payment/PaymentForm';
import { paymentLoader } from '@slice';
import { addPayment } from '@service/api';

const PaymentContainer = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments);

  useEffect(async () => {
    dispatch(
      // TODO: 추후 로그인 기능이 완료되면, localStorage에서 정보 가져올 예정
      paymentLoader({
        userId: '5fbe261bf9266857e4dd7c3f',
        accountBookId: '5fc46c4209dfb476c8bac16d',
      })
    );
  }, []);

  const handleClick = async ({ userId, paymentName }) => {
    const addResult = await addPayment({
      userId,
      paymentName,
    });

    if (addResult === 'success') {
      dispatch(
        paymentLoader({
          userId,
          accountBookId: '5fc46c4209dfb476c8bac16d',
        })
      );
    }
  };

  return <PaymentForm payments={payments} addClick={handleClick} />;
};

export default PaymentContainer;
