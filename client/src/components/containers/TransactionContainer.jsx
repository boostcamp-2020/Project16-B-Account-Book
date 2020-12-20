import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addTransaction,
  removeTransaction,
  changeTransaction,
  loadTransactions,
  updateDate,
  loadAccountbookInfo,
} from '@slice';
import TransactionList from '@presentational/transaction/TransactionList';
import TransactionFab from '@presentational/transaction/TransactionFab';
import TransactionModal from '@presentational/transaction/TransactionModal';
import TransactionLineChart from '@presentational/transaction/TransactionLineChart';
import TransactionDate from '@presentational/transaction/TransactionDate';
import { getCurrentDateTransactions } from '@util/transaction';
import { closeModal } from '@transactionSlice';

const TransactionContainer = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.default.transactions);
  const date = useSelector((state) => state.default.selectedDate);

  const currentDateTransactions = getCurrentDateTransactions(
    date,
    transactions
  );

  useEffect(() => {
    dispatch(loadTransactions());
    dispatch(loadAccountbookInfo());
  }, []);

  const insertTransaction = ({ transaction }) => {
    dispatch(addTransaction({ transactions: [transaction] }));
  };

  const bulkInsertTransactionHandler = ({ transactions }) => {
    dispatch(addTransaction({ transactions }));
  };

  const deleteTransactionHandler = (transactionIds) => {
    dispatch(removeTransaction({ transactionIds }));
  };

  const updateTransactionHandler = ({ transactionId, transaction }) => {
    dispatch(changeTransaction({ transactionId, transaction }));
    handleClose();
  };

  const updateDateHandler = ({ date }) => {
    dispatch(updateDate({ date }));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <TransactionDate date={date} updateDateHandler={updateDateHandler} />
      <TransactionLineChart currentDateTransactions={currentDateTransactions} />
      <TransactionFab />
      <TransactionModal
        insertTransaction={insertTransaction}
        updateTransactionHandler={updateTransactionHandler}
        deleteTransactionHandler={deleteTransactionHandler}
        bulkInsertTransactionHandler={bulkInsertTransactionHandler}
        handleClose={handleClose}
      />
      <TransactionList
        transactions={currentDateTransactions}
        deleteTransactionHandler={deleteTransactionHandler}
      />
    </>
  );
};

export default TransactionContainer;
