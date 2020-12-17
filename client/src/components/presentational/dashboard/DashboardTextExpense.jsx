import { useState } from 'react';
import styled, { css } from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid #ddd;
  width: fit-content;
  padding: 12px;
`;

const Title = styled.div`
  font-size: 1.5vw;
`;

const Body = styled.div``;

const Tabs = styled.div`
  display: flex;
`;

const Tab = styled.div`
  padding: 0.5rem 3rem;
  font-size: 2vw;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }

  ${(props) => {
    if (props.isActive) {
      return css`
        border-bottom: 2px solid black;
        color: black;
      `;
    }
    return css`
      border-bottom: 1.5px solid #ebe7e7;
      color: grey;
    `;
  }}
`;

const SmallText = styled.span`
  font-size: 1vw;
  color: grey;
`;

const Info = styled.div`
  display: flex;
  font-size: 2vw;
  flex-direction: column;
  padding: 0.7rem 0px;
  & > * {
    margin-left: auto;
  }
`;

const Underline = styled.div`
  border-bottom: 1.5px solid #ebe7e7;
  width: 80%;
  margin-left: auto;
  margin-bottom: 0.5rem;
`;

const DashboardTextExpense = ({ transactions }) => {
  const [expenseStatus, setExpenseStatus] = useState(true);
  const [incomeStatus, setIncomeStatus] = useState(false);
  let total = 0;
  let expenseTotal = 0;
  let incomeTotal = 0;

  const handleOnClick = (e) => {
    if (e.target.innerText === '지출') {
      setExpenseStatus(true);
      setIncomeStatus(false);
      return;
    }
    setExpenseStatus(false);
    setIncomeStatus(true);
  };

  const cardTransactions = transactions.map((transaction, i) => {
    if (transaction.type === '지출') {
      expenseTotal += transaction.cost;
      total -= transaction.cost;
    }
    if (transaction.type === '수입') {
      incomeTotal += transaction.cost;
      total += transaction.cost;
      return;
    }

    return (
      <Info key={`card-transaction${i}`}>
        <SmallText>{transaction.paymentMethod}</SmallText>
        <span>{Number(transaction.cost).toLocaleString()}</span>
      </Info>
    );
  });

  return (
    <>
      <StyledDiv>
        <Title>결제 방식별 지출</Title>
        <Tabs>
          <Tab isActive={expenseStatus} onClick={handleOnClick}>
            <span>지출</span>
          </Tab>
          <Tab isActive={incomeStatus} onClick={handleOnClick}>
            수입
          </Tab>
        </Tabs>
        <Body>
          <Info>
            <SmallText>전체</SmallText>
            <span>
              {expenseStatus && Math.abs(Number(expenseTotal)).toLocaleString()}
              {incomeStatus && Number(total).toLocaleString()}
            </span>
          </Info>
          <Underline />
          {expenseStatus && cardTransactions}
          {incomeStatus && (
            <Info>
              <SmallText>수입</SmallText>
              <span>{incomeTotal.toLocaleString()}</span>
              <SmallText>지출</SmallText>
              <span>-{expenseTotal.toLocaleString()}</span>
            </Info>
          )}
        </Body>
      </StyledDiv>
    </>
  );
};

export default DashboardTextExpense;
