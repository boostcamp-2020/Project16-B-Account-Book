import { createSlice } from '@reduxjs/toolkit';

import { fetchTest } from './services/api';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: {
    test: 1,
  },

  reducers: {
    setTest(state, { payload: test }) {
      return {
        ...state,
        test,
      };
    },
  },
});

export const { setTest } = actions;

export const loader = ({ test }) => {
  console.log('loader', test);
  return async (dispatch) => {
    const testData = await fetchTest({ test });
    console.log(testData);
    dispatch(setTest(testData));
  };
};

export default reducer;