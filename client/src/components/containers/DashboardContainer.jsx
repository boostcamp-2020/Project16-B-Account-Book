import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import DashboardVisualExpense from '../presentational/dashboard/DashboardVisualExpense';
import DashboardTextExpense from '../presentational/dashboard/DashboardTextExpense';
import { loadTransactions } from '@slice';
const StyledDiv = styled.div`
  display: flex;
  & > * {
    margin-right: 1rem;
  }
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
      (item) => item.paymentMethod === cur.paymentMethod
    );
    if (acc[index]) {
      acc[index].cost += cur.cost;
      return acc;
    }
    return [...acc, { paymentMethod: cur.paymentMethod, cost: cur.cost }];
  }, []);

  return (
    <>
      <div>DashboardContainer</div>
      <StyledDiv>
        <DashboardVisualExpense transactions={transactions} />
        <MediaTextExpense>
          <DashboardTextExpense transactions={transactionByCard} />
        </MediaTextExpense>
      </StyledDiv>
    </>
  );
};

export default DashboardContainer;
