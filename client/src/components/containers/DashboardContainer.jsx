import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import DashboardVisualExpense from '../presentational/dashboard/DashboardVisualExpense';
import DashboardTextExpense from '../presentational/dashboard/DashboardTextExpense';
import OtherAnalyses from '../presentational/dashboard/OtherAnalyses';
import { loadTransactions } from '@slice';
import {
  getCurrentDateTransactions,
  getTransactionsByPaymentMethod,
  getTransactionsByCategory,
} from '@util/transaction';
import GuideLine from '../presentational/dashboard/GuideLine';

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
  @media (max-width: 967px) {
    flex-direction: column;
    & > * {
      margin-bottom: 5%;
    }
  }
`;

const DashboardContainer = () => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.default.transactions);

  useEffect(() => {
    dispatch(loadTransactions());
  }, []);

  const date = new Date();
  const currentDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };

  const currentDateTransactions = getCurrentDateTransactions(
    currentDate,
    transactions
  );

  const transactionByCard = getTransactionsByPaymentMethod(
    currentDateTransactions
  );

  const transactionByCategory = getTransactionsByCategory(
    currentDateTransactions
  );

  return (
    <>
      <StyledDiv>
        {transactions[0] ? (
          <>
            <MonthlyAnalysis>
              <DashboardVisualExpense transactions={transactionByCategory} />
              <DashboardTextExpense transactions={transactionByCard} />
            </MonthlyAnalysis>
            <OtherAnalyses
              transactions={transactions}
              transactionByCategory={transactionByCategory}
            />
          </>
        ) : (
          <>
            <div> No transactions! please move to 수입/지출 내역 tab</div>
            <GuideLine />
          </>
        )}
      </StyledDiv>
    </>
  );
};

export default DashboardContainer;
