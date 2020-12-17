import { combineReducers, configureStore } from '@reduxjs/toolkit';

import reducer from './slice';
import paymentReducer from './PaymentSlice';

const rootReducer = combineReducers({
  default: reducer,
  payment: paymentReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
