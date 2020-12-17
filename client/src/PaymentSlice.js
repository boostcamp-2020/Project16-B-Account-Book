import { createSlice } from '@reduxjs/toolkit';

import {
  getPayments,
  getPaymentsDetail,
  patchPayment,
  deletePayment,
  updatePayment,
} from '@service/paymentAPI';

const paymentReducer = createSlice({
  name: 'payment',
  initialState: {
    payments: [],
    paymentsDetail: [{ title: null }],
  },
  reducers: {
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
  },
});

export const { setPayments, setPaymentsDetail } = paymentReducer.actions;

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

export default paymentReducer;
