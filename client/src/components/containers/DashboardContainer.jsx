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

  const date = new Date();
  const currentDate = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
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
              <MediaTextExpense>
                <DashboardTextExpense transactions={transactionByCard} />
              </MediaTextExpense>
            </MonthlyAnalysis>
            <OtherAnalyses
              transactions={transactions}
              transactionByCategory={transactionByCategory}
            />
          </>
        ) : (
          <div> No transactions! please move to 수입/지출 내역 tab</div>
        )}
      </StyledDiv>
    </>
  );
};

export default DashboardContainer;
