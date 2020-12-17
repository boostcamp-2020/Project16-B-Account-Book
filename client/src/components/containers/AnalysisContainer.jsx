import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loadAccountBookTransactions } from '@slice';
import AnalysisForm from '../presentational/analysis/AnalysisForm';

const AnalysisContainer = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.default.accountBookTransactions
  );
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const [locState, setLocState] = useState(location);

  useEffect(() => {
    dispatch(loadAccountBookTransactions());
  }, []);

  return (
    <>
      <AnalysisForm
        date={date}
        setDate={setDate}
        transactions={transactions}
        location={locState}
        setLocState={setLocState}
      />
    </>
  );
};

export default AnalysisContainer;
