import { createSlice } from '@reduxjs/toolkit';

import {
  postLoginGithub,
  postLoginNaver,
  postLoginKakao,
  getTags,
  createTag,
  updateTag,
  deleteTag,
  getTransactions,
  getTransactionsByAccountBookId,
  getCalendarTransactions,
  postTransaction,
  postTransactions,
  updateTransaction,
  deleteTransaction,
  getAccountBooks,
  createAccountBook,
  deleteAccountBook,
  updateAccountBook,
  getAccountBook,
} from '@service/api';

import {
  getPayments,
  getPaymentsDetail,
  patchPayment,
  deletePayment,
  updatePayment,
} from '@service/paymentAPI';

import {
  getUserInfo,
  getUsersByAccountBook,
  getInviteUsers,
  updateUserInfo,
  updateMembers,
} from '@service/userAPI';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    accessToken: '',
    test: 1,
    transactions: [],
    accountBookTransactions: [],
    payments: [],
    paymentsDetail: [{ title: null }],
    tags: [],
    accountBooks: [],
    accountBookId: '',
    userInfo: { name: '', ImageURL: '' },
    selectedDate: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDay(),
    },
    calendarInfo: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      day: new Date().getDay(),
    },
    calendarTransactions: [],
    userSettingsInfo: [{ _id: null }],
    userOriginInfo: [{ _id: null }],
    allUsersInfo: [{ _id: null }],
    inviteUsers: [],
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
    setPaymentMethods(state, { payload: paymentMethods }) {
      return {
        ...state,
        paymentMethods,
      };
    },
    setTags(state, { payload: tags }) {
      return {
        ...state,
        tags,
      };
    },
    setCategories(state, { payload: categories }) {
      return {
        ...state,
        categories,
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
    setCalendarInfo(state, { payload: calendarInfo }) {
      return {
        ...state,
        calendarInfo,
      };
    },
    setCalendarTransactions(state, { payload: calendarTransactions }) {
      return {
        ...state,
        calendarTransactions,
      };
    },
    setUserSettingsInfo(state, { payload: userSettingsInfo }) {
      return {
        ...state,
        userSettingsInfo,
      };
    },
    setUserOriginInfo(state, { payload: userOriginInfo }) {
      return {
        ...state,
        userOriginInfo,
      };
    },
    setUserInfo(state, { payload: userInfo }) {
      return {
        ...state,
        userInfo,
      };
    },
    setUsersInfo(state, { payload: allUsersInfo }) {
      return {
        ...state,
        allUsersInfo,
      };
    },
    setInviteUsers(state, { payload: inviteUsers }) {
      return {
        ...state,
        inviteUsers,
      };
    },
    reset() {
      return { state: {} };
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
  setAccountBookTransactions,
  setUserInfo,
  insertTransactions,
  setDate,
  setCalendarInfo,
  setCalendarTransactions,
  setPaymentMethods,
  setCategories,
  setUsersInfo,
  setUserOriginInfo,
  setUserSettingsInfo,
  setInviteUsers,
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

export const loadAccountbookTest = () => {
  return async (dispatch) => {
    const accountBookInfo = await getAccountBook();

    // dispatch(setCategories(accountBookInfo.categories));
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

export const loadCalendarTransactions = (year, month) => {
  return async (dispatch) => {
    const transactions = await getCalendarTransactions(year, month);
    dispatch(setCalendarTransactions(transactions));
  };
};

export const loadUserInfo = () => {
  return async (dispatch) => {
    const userSettingsInfo = await getUserInfo();
    dispatch(setUserSettingsInfo(userSettingsInfo));
    dispatch(setUserOriginInfo(userSettingsInfo));
  };
};

export const loadAllUsersInfo = () => {
  return async (dispatch) => {
    const usersInfo = await getUsersByAccountBook();
    dispatch(setUsersInfo(usersInfo));
  };
};

export const loadInviteUsers = () => {
  return async (dispatch) => {
    const inviteUsers = await getInviteUsers();
    dispatch(setInviteUsers(inviteUsers));
  };
};

export const changeUserInfo = (userInfo) => {
  return async (dispatch) => {
    await updateUserInfo(userInfo);
    dispatch(loadAllUsersInfo());
  };
};

export const changeMembers = (newMembers, deleteMembers) => {
  return async (dispatch) => {
    await updateMembers(newMembers, deleteMembers);
    dispatch(loadAllUsersInfo());
    dispatch(loadInviteUsers());
  };
};

export default reducer;
