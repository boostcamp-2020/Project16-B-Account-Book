import styled from 'styled-components';

import AnalysisDate from './AnalysisDate';
import CumulativeExpenditure from './CumulativeExpenditure';
import CumulativeAnalysis from './CumulativeAnalysis';
import { getCurrentDateTransactions } from '@util/transaction';

const parseDate = (transaction) => {
  const dateObj = new Date(transaction.date);

  return {
    year: dateObj.getUTCFullYear(),
    month: dateObj.getUTCMonth() + 1,
    date: dateObj.getUTCDate(),
  };
};

// TODO: transaction.filter 로 (type: 지출)만 남겨야 하는데
// 데이터 적어서 일단 (수입/지출/all) 전부넣어서 확인
const copyTransactions = (transactions) => {
  return transactions.map((transaction) => {
    return Object.assign({}, transaction, {
      parsedDate: parseDate(transaction),
    });
  });
};

const AnalysisForm = ({ date, setDate, transactions }) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const filteredTransactions = getCurrentDateTransactions(
    { year, month },
    transactions
  );
  const copied = copyTransactions(filteredTransactions);

  return (
    <>
      <AnalysisDate date={date} setDate={setDate} />
      <CumulativeExpenditure transactions={copied} />
      <CumulativeAnalysis date={date} transactions={copied} />
    </>
  );
};

export default AnalysisForm;
