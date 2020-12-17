import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    deleteStatus: false,
    editIdStatus: '',
    openModalStatus: false,
    parserStatus: false,
    bulkInsert: [],
  },
  reducers: {
    setDeleteStatus(state, { payload: deleteStatus }) {
      return {
        ...state,
        deleteStatus,
      };
    },

    setEditIdStatus(state, { payload: editIdStatus }) {
      return {
        ...state,
        editIdStatus,
      };
    },

    setOpenModalStatus(state, { payload: openModalStatus }) {
      return {
        ...state,
        openModalStatus,
      };
    },

    setParserStatus(state, { payload: parserStatus }) {
      return {
        ...state,
        parserStatus,
      };
    },

    setBulkInsert(state, { payload: bulkInsert }) {
      return {
        ...state,
        bulkInsert,
      };
    },
  },
});

export const {
  setDeleteStatus,
  setEditIdStatus,
  setOpenModalStatus,
  setParserStatus,
  setBulkInsert,
} = transactionSlice.actions;

export const closeModal = () => {
  return (dispatch) => {
    dispatch(setOpenModalStatus(false));
    dispatch(setEditIdStatus(''));
    dispatch(setParserStatus(false));
    dispatch(setBulkInsert([]));
  };
};

export default transactionSlice;
