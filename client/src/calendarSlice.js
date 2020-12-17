import { createSlice } from '@reduxjs/toolkit';

import { getCalendarTransactions } from '@service/api';

const CalendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    calendarInfo: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      day: new Date().getDay(),
    },
    calendarTransactions: [],
    userSettingsInfo: [{ _id: null }],
    currentUserInfo: [{ _id: null }],
    allUsersInfo: [{ _id: null }],
    inviteUsers: [],
  },
  reducers: {
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
  },
});

export const {
  setCalendarInfo,
  setCalendarTransactions,
} = CalendarSlice.actions;

export const loadCalendarTransactions = (year, month) => {
  return async (dispatch) => {
    const transactions = await getCalendarTransactions(year, month);
    dispatch(setCalendarTransactions(transactions));
  };
};
export default CalendarSlice;
