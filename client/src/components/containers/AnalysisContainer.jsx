import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadAccountBookTransactions } from '@slice';
import AnalysisForm from '../presentational/analysis/AnalysisForm';

const AnalysisContainer = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.accountBookTransactions);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    dispatch(loadAccountBookTransactions());
  }, []);

  return (
    <>
      <AnalysisForm date={date} setDate={setDate} transactions={transactions} />
    </>
  );
};

export default AnalysisContainer;
