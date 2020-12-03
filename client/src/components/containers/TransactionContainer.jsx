import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addTransaction,
  removeTransaction,
  changeTransaction,
  loadTransactions,
} from '@slice';
import TransactionList from '@presentational/transaction/TransactionList';
import TransactionInputForm from '@presentational/transaction/TransactionInputForm';

const TransactionContainer = () => {
  const dispatch = useDispatch();

  const [editIdStatus, setEditIdStatus] = useState(false);

  const categoryInput = useRef();
  const paymentMethodInput = useRef();
  const costInput = useRef();
  const dateInput = useRef();
  const timeInput = useRef();
  const descriptionInput = useRef();
  const tagInput = useRef();
  const ImageURLInput = useRef();

  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(loadTransactions());
  }, []);

  const insertTransaction = ({ transaction }) => {
    dispatch(addTransaction({ transaction }));
  };

  const deleteTransactionHandler = (transactionId) => {
    dispatch(removeTransaction({ transactionId }));
  };

  const updateTransactionHandler = ({ transaction }) => {
    dispatch(changeTransaction({ transactionId: editIdStatus, transaction }));
    handleCancel();
  };

  const handleCancel = () => {
    categoryInput.current.value = '';
    paymentMethodInput.current.value = '';
    costInput.current.value = '';
    dateInput.current.value = '';
    timeInput.current.value = '';
    descriptionInput.current.value = '';
    tagInput.current.value = '';
    ImageURLInput.current.value = '';
    setEditIdStatus('');
  };

  return (
    <>
      <TransactionInputForm
        insertTransaction={insertTransaction}
        updateTransactionHandler={updateTransactionHandler}
        categoryInput={categoryInput}
        paymentMethodInput={paymentMethodInput}
        costInput={costInput}
        dateInput={dateInput}
        timeInput={timeInput}
        descriptionInput={descriptionInput}
        tagInput={tagInput}
        ImageURLInput={ImageURLInput}
        editIdStatus={editIdStatus}
        handleCancel={handleCancel}
      />
      <TransactionList
        transactions={transactions}
        deleteTransactionHandler={deleteTransactionHandler}
        categoryInput={categoryInput}
        paymentMethodInput={paymentMethodInput}
        costInput={costInput}
        dateInput={dateInput}
        timeInput={timeInput}
        descriptionInput={descriptionInput}
        tagInput={tagInput}
        ImageURLInput={ImageURLInput}
        setEditIdStatus={setEditIdStatus}
      />
    </>
  );
};

export default TransactionContainer;
