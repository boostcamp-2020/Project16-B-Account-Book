import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DetailForm from '@presentational/payment/detail/DetailForm';
import { loadDetailPayment } from '@paymentSlice';

const PaymentDetailContainer = (cardName) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const title = transactions[transactions.length - 1].title;

  useEffect(() => {
    dispatch(loadDetailPayment(cardName.id));
  }, []);

  const showAll = () => {
    dispatch(loadDetailPayment(cardName.id));
  };

  const showIncome = () => {
    console.log('수입 내역');
    //dispatch(addPayment());
  };

  const showExpenditure = () => {
    console.log('지출 내역');
    //dispatch(addPayment());
  };

  return (
    <DetailForm
      title={title}
      transactions={transactions}
      showAll={showAll}
      showIncome={showIncome}
      showExpenditure={showExpenditure}
    />
  );
};

export default PaymentDetailContainer;
