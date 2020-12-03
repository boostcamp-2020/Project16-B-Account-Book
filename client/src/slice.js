import { createSlice } from '@reduxjs/toolkit';

import { fetchTest, getPayment, getTags } from '@service/api';
import { tempTransactionData } from './tempData';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    test: 1,
    transactions: tempTransactionData,
    payments: [],
    tags: [],
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
    setPayments(state, { payload: payments }) {
      return {
        ...state,
        payments,
      };
    },
    setTags(state, { payload: tags }) {
      return {
        ...state,
        tags,
      };
    },
  },
});

export const { setTest, setPayments, setTags } = actions;

export const loader = ({ test }) => {
  console.log('loader', test);
  return async (dispatch) => {
    console.log('asd');
    const testData = await fetchTest({ test });
    dispatch(setTest(testData));
  };
};

export const paymentLoader = ({ userId, accountBookId }) => {
  return async (dispatch) => {
    const paymentsList = await getPayment({
      userId,
      accountBookId,
    });

    dispatch(setPayments(paymentsList));
  };
};

export const tagLoader = ({ accountBookId }) => {
  return async (dispatch) => {
    const tagList = await getTags({
      accountBookId,
    });

    dispatch(setTags(tagList));
  };
};

// export const loadTransaction = ({ userId }) => {
//   return async (dispatch) => {
//     const transactions = await fetchTransactions({ userId })
//     dispatch(setTransactions(transactions))
//   };
// }

export default reducer;
