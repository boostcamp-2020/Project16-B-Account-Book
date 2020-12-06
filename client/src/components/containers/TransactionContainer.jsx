import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addTransaction,
  removeTransaction,
  changeTransaction,
  loadTransactions,
} from '@slice';
import TransactionList from '@presentational/transaction/TransactionList';

const TransactionContainer = () => {
  const dispatch = useDispatch();

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
    emptyInput();
  };

  const deleteTransactionHandler = (transactionId) => {
    dispatch(removeTransaction({ transactionId }));
  };

  const updateTransactionHandler = ({ transaction }) => {
    dispatch(changeTransaction({ transactionId: editIdStatus, transaction }));
    handleCancel();
  };

  const handleCancel = () => {
    emptyInput();
  };

  const emptyInput = () => {
    categoryInput.current.value = '';
    paymentMethodInput.current.value = '';
    costInput.current.value = '';
    dateInput.current.value = '';
    timeInput.current.value = '';
    descriptionInput.current.value = '';
    tagInput.current.value = '';
    ImageURLInput.current.value = '';
  };

  return (
    <>
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
      <TransactionFab setOpenModalStatus={setOpenModalStatus} />
      <TransactionModal
        openModalStatus={openModalStatus}
        setOpenModalStatus={setOpenModalStatus}
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
    </>
  );
};

export default TransactionContainer;
