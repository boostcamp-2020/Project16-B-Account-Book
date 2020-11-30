import { useSelector } from 'react-redux';

import DashboardVisualExpense from '../presentational/DashboardVisualExpense';
import DashboardTextExpense from '../presentational/DashboardTextExpese';

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
      <DashboardVisualExpense transactions={transactions} />
      <DashboardTextExpense transactions={transactionByCard} />
    </>
  );
};

export default DashboardContainer;
