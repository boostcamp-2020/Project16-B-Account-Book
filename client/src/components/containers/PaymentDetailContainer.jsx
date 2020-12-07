import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DetailForm from '@presentational/payment/detail/DetailForm';
import { loadDetailPayment } from '@slice';

const PaymentDetailContainer = (cardName) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState('#ffc221');
  const transactions = useSelector((state) => state.paymentsDetail);

  const title = transactions[transactions.length - 1].title;

  useEffect(() => {
    dispatch(loadDetailPayment(cardName.id, 'all'));
  }, []);

  const showAll = () => {
    setColor('#ffc221');
    dispatch(loadDetailPayment(cardName.id, 'all'));
  };

  const showIncome = () => {
    setColor('#3682e8');
    dispatch(loadDetailPayment(cardName.id, 'income'));
  };

  const showExpenditure = () => {
    setColor('#ff616a');
    dispatch(loadDetailPayment(cardName.id, 'expenditure'));
  };

  return (
    <DetailForm
      color={color}
      title={title}
      transactions={transactions}
      showAll={showAll}
      showIncome={showIncome}
      showExpenditure={showExpenditure}
    />
  );
};

export default PaymentDetailContainer;
