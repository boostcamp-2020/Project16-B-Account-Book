import styled from 'styled-components';

import AnalysisDate from './AnalysisDate';
import CumulativeExpenditure from './CumulativeExpenditure';
import CumulativeAnalysis from './CumulativeAnalysis';
import TopCard from './TopCard';
import { getCurrentDateTransactions } from '@util/transaction';

const TopCardWrapper = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CumulativeContentWrapper = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const parseDate = (transaction) => {
  const dateObj = new Date(transaction.date);

  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    date: dateObj.getDate(),
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

const findTop3BySortOption = (transactions, sortOption) => {
  const map = new Map();

  transactions.forEach((transaction) => {
    let name = transaction.description;
    let cost = transaction.cost;

    if (map.has(name)) {
      map.set(name, {
        cost: map.get(name).cost + cost,
        count: map.get(name).count + 1,
      });
    } else {
      map.set(name, {
        cost,
        count: 1,
      });
    }
  });

  return [...map.entries()]
    .sort((a, b) => b[1][sortOption] - a[1][sortOption])
    .slice(0, 3)
    .map((transaction) => {
      return {
        description: transaction[0],
        cost: transaction[1].cost,
        count: transaction[1].count,
      };
    });
};

const AnalysisForm = ({ date, setDate, transactions }) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const filteredTransactions = getCurrentDateTransactions(
    { year, month },
    transactions
  );
  const copied = copyTransactions(filteredTransactions);
  const top3CostTransactions = findTop3BySortOption(copied, 'cost');
  const top3CaseTransactions = findTop3BySortOption(copied, 'count');

  return (
    <>
      <AnalysisDate date={date} setDate={setDate} />
      <CumulativeContentWrapper>
        <CumulativeExpenditure transactions={copied} />
        <CumulativeAnalysis date={date} transactions={copied} />
      </CumulativeContentWrapper>
      <TopCardWrapper>
        <TopCard title={'지출 금액 Top3'} transactions={top3CostTransactions} />
        <TopCard title={'지출 건수 Top3'} transactions={top3CaseTransactions} />
      </TopCardWrapper>
    </>
  );
};

export default AnalysisForm;
