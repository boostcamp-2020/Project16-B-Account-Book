import { createSlice } from '@reduxjs/toolkit';

import { fetchTest } from './services/api';

import { tempTransactionData } from './tempData';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    test: 1,
    transactions: tempTransactionData,
  },

  reducers: {
    setTest(state, { payload: test }) {
      return {
        ...state,
        test,
      };
    },
    setTransactions(state, { payload: transactions }) {
      return {
        ...state,
        transactions,
      };
    },
  },
});

export const { setTest } = actions;

export const loader = ({ test }) => {
  console.log('loader', test);
  return async (dispatch) => {
    console.log('asd');
    const testData = await fetchTest({ test });
    dispatch(setTest(testData));
  };
};

// export const loadTransaction = ({ userId }) => {
//   return async (dispatch) => {
//     const transactions = await fetchTransactions({ userId })
//     dispatch(setTransactions(transactions))
//   };
// }

export default reducer;
