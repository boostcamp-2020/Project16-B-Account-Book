import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DetailForm from '@presentational/payment/detail/DetailForm';
import { loadDetailPayment } from '@paymentSlice';

const PaymentDetailContainer = (cardName) => {
  const dispatch = useDispatch();
  const [color, setColor] = useState('#ffc221');

  const date = new Date();
  const [year, setYear] = useState(date.getUTCFullYear());
  const [month, setMonth] = useState(date.getUTCMonth() + 1);

  const transactions = useSelector((state) => state.payment.paymentsDetail);

  const title = transactions[transactions.length - 1].title;

  useEffect(() => {
    dispatch(loadDetailPayment(cardName.id, 'all', year, month));
  }, []);

  const showAll = () => {
    setColor('#ffc221');
    dispatch(loadDetailPayment(cardName.id, 'all', year, month));
  };

  const showIncome = () => {
    setColor('#3682e8');
    dispatch(loadDetailPayment(cardName.id, 'income', year, month));
  };

  const showExpenditure = () => {
    setColor('#ff616a');
    dispatch(loadDetailPayment(cardName.id, 'expenditure', year, month));
  };

  return (
    <DetailForm
      color={color}
      title={title}
      transactions={transactions}
      showAll={showAll}
      showIncome={showIncome}
      showExpenditure={showExpenditure}
      setYear={setYear}
      setMonth={setMonth}
    />
  );
};

export default PaymentDetailContainer;
