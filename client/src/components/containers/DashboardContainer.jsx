import React from 'react';
import DashboardVisualExpense from '../presentational/DashboardVisualExpense';

import { useSelector } from 'react-redux';

const DashboardContainer = () => {

  const transactions = useSelector((state)=> state.transactions);

  return (
    <>
      <div>DashboardContainer</div>
      <DashboardVisualExpense transactions = {transactions} />
    </>
  )
};


export default DashboardContainer;