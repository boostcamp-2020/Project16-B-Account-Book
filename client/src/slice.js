import { createSlice } from '@reduxjs/toolkit';

import {
  fetchTest,
  postLoginGithub,
  postLoginNaver,
  getTags,
  createTag,
  updateTag,
  deleteTag,
  getTransactions,
  postTransaction,
  updateTransaction,
  deleteTransaction,
} from '@service/api';

import {
  getPayment,
  patchPayment,
  deletePayment,
  updatePayment,
} from '@service/paymentAPI';

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

export const loadTag = ({ accountBookId }) => {
  return async (dispatch) => {
    const tags = await getTags({ accountBookId });

    dispatch(setTags(tags));
  };
};

export const addTag = ({ accountBookId, tag }) => {
  return async (dispatch) => {
    await createTag({ accountBookId, tag });

    dispatch(loadTag({ accountBookId }));
  };
};

export const changeTag = ({ accountBookId, originalTag, newTag }) => {
  return async (dispatch) => {
    await updateTag({ accountBookId, originalTag, newTag });

    dispatch(loadTag({ accountBookId }));
  };
};

export const removeTag = ({ accountBookId, tag }) => {
  return async (dispatch) => {
    await deleteTag({ accountBookId, tag });

    dispatch(loadTag({ accountBookId }));
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
