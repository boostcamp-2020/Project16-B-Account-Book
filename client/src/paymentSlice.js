import { createSlice } from '@reduxjs/toolkit';

import {
  getPayment,
  patchPayment,
  deletePayment,
  updatePayment,
  getAllTransaction,
} from '@service/paymentAPI';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    payments: [],
    transactions: [],
  },
  accessToken: '',

  reducers: {
    setPayments(state, { payload: payments }) {
      return {
        ...state,
        payments,
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

export const { setPayments, setTransactions } = actions;

export const loadPayment = () => {
  return async (dispatch) => {
    const paymentsList = await getPayment();

    dispatch(setPayments(paymentsList));
  };
};

export const loadDetailPayment = (cardName) => {
  return async (dispatch) => {
    const paymentsList = await getAllTransaction(cardName);

    dispatch(setTransactions(paymentsList));
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

export default reducer;
