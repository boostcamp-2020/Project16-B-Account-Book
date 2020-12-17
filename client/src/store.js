import { combineReducers, configureStore } from '@reduxjs/toolkit';

import reducer from './slice';
import transactionSlice from './transactionSlice';

const rootReducer = combineReducers({
  default: reducer,
  transaction: transactionSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
