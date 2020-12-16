import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import DashboardVisualExpense from '../presentational/dashboard/DashboardVisualExpense';
import DashboardTextExpense from '../presentational/dashboard/DashboardTextExpense';
import { loadTransactions } from '@slice';
import CategorySection from '../presentational/dashboard/CategorySection';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-right: 1rem;
    margin-bottom: 5%;
  }
`;

const MonthlyAnalysis = styled.div`
  display: flex;
  flex-direction: row;
`;

const MediaTextExpense = styled.div`
  transition: 1s;
  @media (max-width: 967px) {
    transform: translate(-47vw, 110%);
  }
  @media (max-width: 768px) {
    transform: translate(-50vw, 110%);
  }
`;

const DashboardContainer = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(loadTransactions());
  }, []);

  const transactionByCard = transactions.reduce((acc, cur) => {
    const index = acc.findIndex(
      (item) =>
        item.paymentMethod === cur.paymentMethod && item.type === cur.type
    );
    if (acc[index]) {
      acc[index].cost += cur.cost;
      return acc;
    }
    return [
      ...acc,
      { paymentMethod: cur.paymentMethod, cost: cur.cost, type: cur.type },
    ];
  }, []);

  const parseData = (transactions) => {
    return transactions
      .reduce((acc, cur) => {
        if (cur.type === '수입') {
          return acc;
        }
        const index = acc.findIndex((item) => item.name === cur.category);
        if (acc[index]) {
          acc[index].value += cur.cost;
          return acc;
        }
        return [...acc, { name: cur.category, value: cur.cost }];
      }, [])
      .sort((a, b) => {
        if (a.cost > b.cost) {
          return 1;
        }
        if (a.cost < b.cost) {
          return -1;
        }
        return 1;
      });
  };

  const transactionByCategory = parseData(transactions);

  return (
    <>
      <div>DashboardContainer</div>
      <StyledDiv>
        <MonthlyAnalysis>
          {transactions[0] ? (
            <>
              <DashboardVisualExpense transactions={transactionByCategory} />
              <MediaTextExpense>
                <DashboardTextExpense transactions={transactionByCard} />
              </MediaTextExpense>
            </>
          ) : (
            <div> No transactions! please move to 수입/지출 내역 tab</div>
          )}
        </MonthlyAnalysis>
        <CategorySection transaction={transactionByCategory} />
      </StyledDiv>
    </>
  );
};

export default DashboardContainer;
