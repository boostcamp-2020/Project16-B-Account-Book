import { useState } from 'react';
import styled, { css } from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid #ddd;
  width: fit-content;
  padding: 12px;
`;
//TODO: 그래프 css 수정 후 이 css도 다 다시 수정
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
  const [profitStatus, setProfitStatus] = useState(false);
  let total = 0;
  let expenseTotal = 0;
  let profitTotal = 0;

  const handleOnClick = (e) => {
    if (e.target.innerText === '지출') {
      setExpenseStatus(true);
      setProfitStatus(false);
      return;
    }
    setExpenseStatus(false);
    setProfitStatus(true);
  };

  const cardTransactions = transactions.map((transaction, i) => {
    total += transaction.cost;
    if (transaction.cost > 0) {
      expenseTotal += transaction.cost;
    }
    if (transaction.cost < 0) {
      profitTotal += transaction.cost;
    }
    // TODO/고민:
    // 이걸 여기서 연산해도 되는지?
    // profit이 양수? expense가 음수??
    // 나중에 지출/수입 형태 결정되면 다시 수정하기
    return (
      <Info key={`card-transaction${i}`}>
        <SmallText>{transaction.card}</SmallText>
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
          <Tab isActive={profitStatus} onClick={handleOnClick}>
            수입
          </Tab>
        </Tabs>
        <Body>
          <Info>
            <SmallText>전체</SmallText>
            <span>
              {expenseStatus && Number(total).toLocaleString()}
              {profitStatus && '-' + Number(total).toLocaleString()}
            </span>
          </Info>
          <Underline />
          {expenseStatus && cardTransactions}
          {profitStatus && (
            <Info>
              <SmallText>수입</SmallText>
              <span>{profitTotal.toLocaleString()}</span>
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
