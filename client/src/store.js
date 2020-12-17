import { combineReducers, configureStore } from '@reduxjs/toolkit';

import reducer from './slice';
import paymentSlice from './paymentSlice';
import calendarSlice from './calendarSlice';
import settingSlice from './settingSlice';

const rootReducer = combineReducers({
  default: reducer,
  payment: paymentSlice.reducer,
  calendar: calendarSlice.reducer,
  setting: settingSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
