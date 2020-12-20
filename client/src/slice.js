import { createSlice } from '@reduxjs/toolkit';

import {
  postLoginGithub,
  postLoginNaver,
  postLoginKakao,
  getTransactions,
  getTransactionsByAccountBookId,
  postTransaction,
  updateTransaction,
  updateTransactionTag,
  deleteTransaction,
  deleteTransactionTag,
  getAccountBooks,
  createAccountBook,
  deleteAccountBook,
  updateAccountBook,
  getAccountBook,
} from '@service/api';
import { setTags } from './tagSlice';

const { actions, reducer } = createSlice({
  name: 'default',
  initialState: {
    accessToken: '',
    transactions: [],
    accountBookTransactions: [],
    accountBooks: [],
    accountBookId: '',
    userInfo: { name: '', ImageURL: '' },
    selectedDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDay(),
    },
  },
  reducers: {
    setPaymentMethods(state, { payload: paymentMethods }) {
      return {
        ...state,
        paymentMethods,
      };
    },
    setTransactions(state, { payload: transactions }) {
      return {
        ...state,
        transactions,
      };
    },
    setAccountBookTransactions(state, { payload: accountBookTransactions }) {
      return {
        ...state,
        accountBookTransactions,
      };
    },
    insertTransactions(state, { payload: transactions }) {
      state.transactions.push(transactions);
    },
    setAccessToken(state, { payload: accessToken }) {
      return {
        ...state,
        accessToken,
      };
    },
    setAccountBooks(state, { payload: accountBooks }) {
      return {
        ...state,
        accountBooks,
      };
    },
    setAccountBook(state, { payload: accountBookId }) {
      return {
        ...state,
        accountBookId,
      };
    },
    setDate(state, { payload: selectedDate }) {
      return {
        ...state,
        ...selectedDate,
      };
    },

    setUserInfo(state, { payload: userInfo }) {
      return {
        ...state,
        userInfo,
      };
    },
    reset() {
      return { state: {} };
    },
  },
});

export const {
  setAccessToken,
  setAccountBooks,
  setAccountBook,
  setTransactions,
  setAccountBookTransactions,
  setUserInfo,
  insertTransactions,
  setDate,
  setPaymentMethods,
  reset,
} = actions;

export function login({ code, state }) {
  return async (dispatch) => {
    let accessToken;
    let userInfo;

    if (code && state === 'naver') {
      const result = await postLoginNaver(code);
      accessToken = result.token;
      userInfo = result.userInfo;
    }
    if (code && state === 'kakao') {
      const result = await postLoginKakao(code);
      accessToken = result.token;
      userInfo = result.userInfo;
    }
    if (code && !state) {
      const result = await postLoginGithub(code);
      accessToken = result.token;
      userInfo = result.userInfo;
    }

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    dispatch(setAccessToken(accessToken));
    dispatch(setUserInfo(userInfo));
  };
}

export const loadTransactions = () => {
  return async (dispatch) => {
    const transactions = await getTransactions();

    dispatch(setTransactions(transactions));
  };
};

export const loadAccountBookTransactions = () => {
  return async (dispatch) => {
    const accountBookTransactions = await getTransactionsByAccountBookId();

    dispatch(setAccountBookTransactions(accountBookTransactions));
  };
};

export const addTransaction = ({ transactions }) => {
  return async (dispatch) => {
    await postTransaction({ transactions });

    dispatch(loadTransactions());
  };
};

export const changeTransaction = ({ transactionId, transaction }) => {
  return async (dispatch) => {
    await updateTransaction({ transactionId, transaction });

    dispatch(loadTransactions());
  };
};

export const removeTransaction = ({ transactionIds }) => {
  return async (dispatch) => {
    await deleteTransaction({ transactionIds });

    dispatch(loadTransactions());
  };
};

export const changeTransactionTag = (oldTag, newTag) => {
  return async (dispatch) => {
    await updateTransactionTag({ oldTag, newTag });

    dispatch(loadTransactions());
  };
};

export const removeTransactionTag = (tag) => {
  return async (dispatch) => {
    await deleteTransactionTag({ tag });

    dispatch(loadTransactions());
  };
};

export const loadAccountBooks = () => {
  return async (dispatch) => {
    const accountBooks = await getAccountBooks();
    dispatch(setAccountBooks(accountBooks));
  };
};

export const loadAccountBook = (accountBookId) => {
  return (dispatch) => {
    dispatch(setAccountBook(accountBookId));
  };
};

export const loadAccountbookInfo = () => {
  return async (dispatch) => {
    const accountBookInfo = await getAccountBook();

    dispatch(setTags(accountBookInfo.tags));
    dispatch(setPaymentMethods(accountBookInfo.paymentMethod));
  };
};

export const addAccountBook = (title) => {
  return async (dispatch) => {
    await createAccountBook({ title });

    dispatch(loadAccountBooks());
  };
};

export const removeAccountBook = (accountBookId) => {
  return async (dispatch) => {
    await deleteAccountBook({ accountBookId });

    dispatch(loadAccountBooks());
  };
};

export const changeAccountBook = (accountBookId, newTitle) => {
  return async (dispatch) => {
    await updateAccountBook({ accountBookId, newTitle });

    dispatch(loadAccountBooks());
  };
};

export const updateDate = ({ date }) => {
  return async (dispatch) => {
    dispatch(setDate({ selectedDate: date }));
  };
};

export default reducer;
