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
  @media (max-width: 967px) {
    flex-direction: column;
    & > * {
      margin-bottom: 5%;
    }
  }
`;
const Hole = styled.div`
  position: fixed;
  top: 153px;
  left: 0px;
  width: 250px;
  height: 50px;
  box-shadow: 0 0 0 200rem rgba(0, 0, 0, 0.75);
`;

const TopHole = styled.div`
  position: fixed;
  top: 61px;
  left: 0px;
  width: 253px;
  height: 83px;
  box-shadow: inset 5rem -2rem 0px 11rem rgba(0, 0, 0, 0.75);
  z-index: 100;
`;

const BottomHole = styled.div`
  position: fixed;
  top: 205px;
  left: 0px;
  width: 253px;
  height: 100%;
  box-shadow: inset 5rem -2rem 0px 16rem rgba(0, 0, 0, 0.75);
  z-index: 100;
`;

const Arrow = styled.div`
  width: 3vw;
  height: 3vw;
  border: 2.5vw solid;
  border-color: white transparent transparent white;
  position: fixed;
  left: 300px;
  top: 125px;
  transform: rotate(-45deg) !important;

  animation: slide 2s infinite;
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateX(9vw) rotate(-45deg);
    }

    100% {
      opacity: 1;
      transform: translateX(0vw) rotate(-45deg);
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
            <TopHole />
            <Hole />
            <BottomHole />
            <Arrow className={'fa'} />
          </>
        )}
      </StyledDiv>
    </>
  );
};

export default DashboardContainer;
