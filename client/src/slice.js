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
  getAccountBooks,
  createAccountBook,
  deleteAccountBook,
} from '@service/api';

import {
  getPayments,
  getPaymentsDetail,
  patchPayment,
  deletePayment,
  updatePayment,
} from '@service/paymentAPI';

import { tempTransactionData } from './tempData';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    accessToken: '',
    test: 1,
    transactions: tempTransactionData,
    payments: [],
    paymentsDetail: [{ title: null }],
    tags: [],
    accountBooks: [],
    accountBookId: '',
    selectedDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDay(),
    },
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
    insertTransactions(state, { payload: transactions }) {
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
    setPaymentsDetail(state, { payload: paymentsDetail }) {
      return {
        ...state,
        paymentsDetail,
      };
    },
    setTags(state, { payload: tags }) {
      return {
        ...state,
        tags,
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
  },
});

export const {
  setTest,
  setAccessToken,
  setPayments,
  setPaymentsDetail,
  setTags,
  setAccountBooks,
  setAccountBook,
  setTransactions,
  insertTransactions,
  setDate,
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
    const paymentsList = await getPayments();

    dispatch(setPayments(paymentsList));
  };
};

export const loadDetailPayment = (cardName, type, year, month) => {
  return async (dispatch) => {
    const paymentsList = await getPaymentsDetail(cardName, type, year, month);

    dispatch(setPaymentsDetail(paymentsList));
  };
};

export const addPayment = ({ paymentName }) => {
  return async (dispatch) => {
    await patchPayment({ paymentName });

    dispatch(loadPayment());
  };
};

export const removePayment = ({ paymentName }) => {
  return async (dispatch) => {
    await deletePayment({ paymentName });

    dispatch(loadPayment());
  };
};

export const changePayment = ({ selectedCardName, newCardName }) => {
  return async (dispatch) => {
    await updatePayment({ selectedCardName, newCardName });

    dispatch(loadPayment());
  };
};

export const loadTag = () => {
  return async (dispatch) => {
    const tags = await getTags();

    dispatch(setTags(tags));
  };
};

export const addTag = ({ tag }) => {
  return async (dispatch) => {
    await createTag({ tag });

    dispatch(loadTag());
  };
};

export const changeTag = ({ originalTag, newTag }) => {
  return async (dispatch) => {
    await updateTag({ originalTag, newTag });

    dispatch(loadTag());
  };
};

export const removeTag = ({ tag }) => {
  return async (dispatch) => {
    await deleteTag({ tag });

    dispatch(loadTag());
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

export const loadAccountBooks = () => {
  return async (dispatch) => {
    const accountBooks = await getAccountBooks();

    dispatch(setAccountBooks(accountBooks));
  };
};

export const loadAccountBook = ({ accountBookId }) => {
  return (dispatch) => {
    dispatch(setAccountBook(accountBookId));
  };
};

export const addAccountBook = ({ title }) => {
  return async (dispatch) => {
    await createAccountBook({ title });

    dispatch(loadAccountBooks());
  };
};

export const removeAccountBook = ({ accountBookId }) => {
  return async (dispatch) => {
    await deleteAccountBook({ accountBookId });

    dispatch(loadAccountBooks());
  };
};

export const updateDate = ({ date }) => {
  return async (dispatch) => {
    dispatch(setDate({ selectedDate: date }));
  };
};

export default reducer;
