import { useSelector } from 'react-redux';
import styled from 'styled-components';

import DashboardVisualExpense from '../presentational/dashboard/DashboardVisualExpense';
import DashboardTextExpense from '../presentational/dashboard/DashboardTextExpense';

const StyledDiv = styled.div`
  display: flex;
  & > * {
    margin-right: 1rem;
  }
`;

const MediaTextExpense = styled.div`
  transition: 1s;
  @media (max-width: 967px) {
    transform: translate(-160%, 110%);
  }
`;

const DashboardContainer = () => {
  const transactions = useSelector((state) => state.transactions);

  const transactionByCard = transactions.reduce((acc, cur) => {
    const index = acc.findIndex((item) => item.card === cur.card);
    if (acc[index]) {
      acc[index].cost += cur.cost;
      return acc;
    }
    return [...acc, { card: cur.card, cost: cur.cost }];
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
