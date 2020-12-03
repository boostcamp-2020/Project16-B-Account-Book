import { createSlice } from '@reduxjs/toolkit';

import {
  fetchTest,
  getPayment,
  patchPayment,
  deletePayment,
  updatePayment,
} from '@service/api';
import { tempTransactionData } from './tempData';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    test: 1,
    transactions: tempTransactionData,
    payments: [],
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
  },
});

export const { setTest, setPayments } = actions;

export const loader = ({ test }) => {
  console.log('loader', test);
  return async (dispatch) => {
    console.log('asd');
    const testData = await fetchTest({ test });
    dispatch(setTest(testData));
  };
};

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

// export const loadTransaction = ({ userId }) => {
//   return async (dispatch) => {
//     const transactions = await fetchTransactions({ userId })
//     dispatch(setTransactions(transactions))
//   };
// }

export default reducer;
