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
  getTransactions,
  postTransaction,
  updateTransaction,
  deleteTransaction,
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
    insertTransactions(state, { payload: transactions }) {
      console.log(transactions, 'transaction');
      state.transactions.push(transactions);
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

export const {
  setTest,
  setAccessToken,
  setPayments,
  setTags,
  setTransactions,
  insertTransactions,
} = actions;

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

export const loadPayment = ({ userId, accountBookId }) => {
  return async (dispatch) => {
    const paymentsList = await getPayment({
      userId,
      accountBookId,
    });

    dispatch(setPayments(paymentsList));
  };
};

export const addPayment = ({ userId, paymentName }) => {
  return async (dispatch) => {
    await patchPayment({
      userId,
      paymentName,
    });

    dispatch(
      loadPayment({
        userId,
        accountBookId: '5fc46c4209dfb476c8bac16d',
      })
    );
  };
};

export const removePayment = ({ paymentName }) => {
  return async (dispatch) => {
    await deletePayment({
      userId: '5fbe261bf9266857e4dd7c3f',
      paymentName,
    });

    dispatch(
      loadPayment({
        userId: '5fbe261bf9266857e4dd7c3f',
        accountBookId: '5fc46c4209dfb476c8bac16d',
      })
    );
  };
};

export const changePayment = ({ selectedCardName, newCardName }) => {
  return async (dispatch) => {
    await updatePayment({
      userId: '5fbe261bf9266857e4dd7c3f',
      selectedCardName,
      newCardName,
    });

    dispatch(
      loadPayment({
        userId: '5fbe261bf9266857e4dd7c3f',
        accountBookId: '5fc46c4209dfb476c8bac16d',
      })
    );
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

export const loadTransactions = () => {
  return async (dispatch) => {
    const transactions = await getTransactions();

    dispatch(setTransactions(transactions));
  };
};

export const addTransaction = ({ transaction }) => {
  return async (dispatch) => {
    await postTransaction({ transaction });

    dispatch(loadTransactions());
  };
};

export const changeTransaction = ({ transactionId, transaction }) => {
  return async (dispatch) => {
    await updateTransaction({ transactionId, transaction });

    dispatch(loadTransactions());
  };
};

export const removeTransaction = ({ transactionId }) => {
  return async (dispatch) => {
    await deleteTransaction({ transactionId });

    dispatch(loadTransactions());
  };
};

export default reducer;
