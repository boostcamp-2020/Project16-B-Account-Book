import { createSlice } from '@reduxjs/toolkit';

import {
  fetchTest,
  postLoginGithub,
  postLoginNaver,
  getPayment,
  patchPayment,
  deletePayment,
  updatePayment,
  getTags,
} from '@service/api';

import { tempTransactionData } from './tempData';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    test: 1,
    transactions: tempTransactionData,
    payments: [],
    tags: [],
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
    setTags(state, { payload: tags }) {
      return {
        ...state,
        tags,
      };
    },
  },
});

export const { setTest, setAccessToken, setPayments, setTags } = actions;

export const loader = ({ test }) => {
  return async (dispatch) => {
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

export const loadPayment = () => {
  return async (dispatch) => {
    const paymentsList = await getPayment();

    dispatch(setPayments(paymentsList));
  };
};

export const addPayment = ({ paymentName }) => {
  return async (dispatch) => {
    await patchPayment({
      paymentName,
    });

    dispatch(loadPayment());
  };
};

export const removePayment = ({ paymentName }) => {
  return async (dispatch) => {
    await deletePayment({
      paymentName,
    });

    dispatch(loadPayment());
  };
};

export const changePayment = ({ selectedCardName, newCardName }) => {
  return async (dispatch) => {
    await updatePayment({
      selectedCardName,
      newCardName,
    });

    dispatch(loadPayment());
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

export default reducer;
