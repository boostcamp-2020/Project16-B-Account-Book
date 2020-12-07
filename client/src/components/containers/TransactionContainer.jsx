import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addTransaction,
  removeTransaction,
  changeTransaction,
  loadTransactions,
  updateDate,
} from '@slice';
import TransactionList from '@presentational/transaction/TransactionList';
import TransactionFab from '../presentational/transaction/TransactionFab';
import TransactionModal from '../presentational/transaction/TransactionModal';
import TransactionLineChart from '../presentational/transaction/TransactionLineChart';
import TransactionDate from '../presentational/transaction/TransactionDate';
import { getCurrentDateTransactions } from './util';

const TransactionContainer = () => {
  const dispatch = useDispatch();

  const [editIdStatus, setEditIdStatus] = useState('');
  const [openModalStatus, setOpenModalStatus] = useState(false);

  const categoryInput = useRef();
  const paymentMethodInput = useRef();
  const costInput = useRef();
  const dateInput = useRef();
  const timeInput = useRef();
  const descriptionInput = useRef();
  const tagInput = useRef();
  const ImageURLInput = useRef();

  const transactions = useSelector((state) => state.transactions);
  const date = useSelector((state) => state.selectedDate);

  const currentDateTransactions = getCurrentDateTransactions(
    date,
    transactions
  );

  useEffect(() => {
    dispatch(loadTransactions());
  }, []);

  const insertTransaction = ({ transaction }) => {
    dispatch(addTransaction({ transaction }));
    handleCancel();
  };

  const deleteTransactionHandler = (transactionId) => {
    dispatch(removeTransaction({ transactionId }));
  };

  const updateTransactionHandler = ({ transaction }) => {
    dispatch(changeTransaction({ transactionId: editIdStatus, transaction }));
    handleCancel();
  };

  const updateDateHandler = ({ date }) => {
    dispatch(updateDate({ date }));
  };

  const handleCancel = () => {
    setEditIdStatus('');
    setOpenModalStatus(false);
  };

  return (
    <>
      <TransactionDate date={date} updateDateHandler={updateDateHandler} />
      <TransactionLineChart currentDateTransactions={currentDateTransactions} />
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
      <TransactionList
        transactions={currentDateTransactions}
        deleteTransactionHandler={deleteTransactionHandler}
        categoryInput={categoryInput}
        paymentMethodInput={paymentMethodInput}
        costInput={costInput}
        dateInput={dateInput}
        timeInput={timeInput}
        descriptionInput={descriptionInput}
        tagInput={tagInput}
        ImageURLInput={ImageURLInput}
        editIdStatus={editIdStatus}
        setEditIdStatus={setEditIdStatus}
        openModalStatus={openModalStatus}
        setOpenModalStatus={setOpenModalStatus}
      />
    </>
  );
};

export default TransactionContainer;
