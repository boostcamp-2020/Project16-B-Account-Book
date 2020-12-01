import React, { useState, useEffect } from 'react';
import { getPayment } from '@service/api';
import PaymentForm from '@presentational/payment/PaymentForm';

const PaymentContainer = () => {
  const [payments, setPayments] = useState([]);

  useEffect(async () => {
    // TODO: 추후 로그인 기능이 완료되면, localStorage에서 정보 가져올 예정
    const paymentsList = await getPayment({
      userId: '5fbe261bf9266857e4dd7c3f',
      accountBookId: '1',
    });

    setPayments(await paymentsList);
  }, []);

  return <PaymentForm payments={payments} />;
};

export default PaymentContainer;
