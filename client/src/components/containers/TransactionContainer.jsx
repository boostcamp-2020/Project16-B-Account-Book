import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addTransaction,
  removeTransaction,
  changeTransaction,
  loadTransactions,
  updateDate,
  loadAccountbookTest,
} from '@slice';
import TransactionList from '@presentational/transaction/TransactionList';
import TransactionFab from '../presentational/transaction/TransactionFab';
import TransactionModal from '../presentational/transaction/TransactionModal';
import TransactionLineChart from '../presentational/transaction/TransactionLineChart';
import TransactionDate from '../presentational/transaction/TransactionDate';
import { getCurrentDateTransactions } from './util';

const TransactionContainer = () => {
  const dispatch = useDispatch();

  const [deleteStatus, setDeleteStatus] = useState(false);
  const [editIdStatus, setEditIdStatus] = useState('');
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [parserStatus, setParserStatus] = useState(false);

  const transactions = useSelector((state) => state.transactions);
  const date = useSelector((state) => state.selectedDate);
  // const categories = useSelector((state) => state.category);
  const paymentMethods = useSelector((state) => state.paymentMethods);
  const tags = useSelector((state) => state.tags);

  const currentDateTransactions = getCurrentDateTransactions(
    date,
    transactions
  );

  useEffect(() => {
    dispatch(loadTransactions());
    dispatch(loadAccountbookTest());
  }, []);

  const insertTransaction = ({ transaction }) => {
    dispatch(addTransaction({ transaction }));
    handleCancel();
  };

  const deleteTransactionHandler = (transactionIds) => {
    dispatch(removeTransaction({ transactionIds }));
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
      <TransactionFab
        setOpenModalStatus={setOpenModalStatus}
        setDeleteStatus={setDeleteStatus}
        setParserStatus={setParserStatus}
      />
      <TransactionModal
        openModalStatus={openModalStatus}
        setOpenModalStatus={setOpenModalStatus}
        insertTransaction={insertTransaction}
        updateTransactionHandler={updateTransactionHandler}
        deleteTransactionHandler={deleteTransactionHandler}
        editIdStatus={editIdStatus}
        setEditIdStatus={setEditIdStatus}
        handleCancel={handleCancel}
        tags={tags}
        paymentMethods={paymentMethods}
        parserStatus={parserStatus}
        setParserStatus={setParserStatus}
      />
      <TransactionList
        transactions={currentDateTransactions}
        deleteTransactionHandler={deleteTransactionHandler}
        setDeleteStatus={setDeleteStatus}
        setEditIdStatus={setEditIdStatus}
        setOpenModalStatus={setOpenModalStatus}
        deleteStatus={deleteStatus}
      />
    </>
  );
};

export default TransactionContainer;
