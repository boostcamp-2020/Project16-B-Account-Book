import { combineReducers, configureStore } from '@reduxjs/toolkit';

import reducer from './slice';
import paymentSlice from './paymentSlice';
import calendarSlice from './calendarSlice';

const rootReducer = combineReducers({
  default: reducer,
  payment: paymentSlice.reducer,
  calendar: calendarSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
