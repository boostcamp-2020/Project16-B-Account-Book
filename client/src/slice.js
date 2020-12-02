import { createSlice } from '@reduxjs/toolkit';

import {
  fetchTest,
  postLoginGithub,
  postLoginNaver,
  getPayment,
} from './services/api';

import { tempTransactionData } from './tempData';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    test: 1,
    transactions: tempTransactionData,
    payments: [],
  },
  accessToken: '',

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
    setAccessToken(state, { payload: accessToken }) {
      return {
        ...state,
        accessToken,
      };
    },
    setPayments(state, { payload: payments }) {
      return {
        ...state,
        payments,
      };
    },
  },
});

export const { setTest, setAccessToken, setPayments } = actions;

export const loader = ({ test }) => {
  console.log('loader', test);
  return async (dispatch) => {
    console.log('asd');
    const testData = await fetchTest({ test });
    dispatch(setTest(testData));
  };
};

export function login({ code, state }) {
  return async (dispatch) => {
    let accessToken;

    if (code && state === 'naver') {
      accessToken = await postLoginNaver(code);
    }
    if (code && !state) {
      accessToken = await postLoginGithub(code);
    }

    localStorage.setItem('accessToken', accessToken);
    dispatch(setAccessToken(accessToken));
  };
}

export const paymentLoader = ({ userId, accountBookId }) => {
  return async (dispatch) => {
    const paymentsList = await getPayment({
      userId,
      accountBookId,
    });

    dispatch(setPayments(paymentsList));
  };
};
// export const loadTransaction = ({ userId }) => {
//   return async (dispatch) => {
//     const transactions = await fetchTransactions({ userId })
//     dispatch(setTransactions(transactions))
//   };
// }

export default reducer;
