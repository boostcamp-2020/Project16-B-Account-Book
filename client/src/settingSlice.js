import { createSlice } from '@reduxjs/toolkit';

import {
  getUserInfo,
  getUsersByAccountBook,
  getInviteUsers,
  updateUserInfo,
  updateMembers,
} from '@service/userAPI';

const settingSlice = createSlice({
  name: 'calendar',
  initialState: {
    userSettingsInfo: [{ _id: null }],
    currentUserInfo: [{ _id: null }],
    allUsersInfo: [{ _id: null }],
    inviteUsers: [],
  },
  reducers: {
    setUserSettingsInfo(state, { payload: userSettingsInfo }) {
      return {
        ...state,
        userSettingsInfo,
      };
    },
    setCurrentUserInfo(state, { payload: currentUserInfo }) {
      return {
        ...state,
        currentUserInfo,
      };
    },
    setUsersInfo(state, { payload: allUsersInfo }) {
      return {
        ...state,
        allUsersInfo,
      };
    },
    setInviteUsers(state, { payload: inviteUsers }) {
      return {
        ...state,
        inviteUsers,
      };
    },
  },
});

export const {
  setUserSettingsInfo,
  setCurrentUserInfo,
  setUsersInfo,
  setInviteUsers,
} = settingSlice.actions;

export const loadUserInfo = () => {
  return async (dispatch) => {
    const userSettingsInfo = await getUserInfo();
    dispatch(setUserSettingsInfo(userSettingsInfo));
    dispatch(setCurrentUserInfo(userSettingsInfo));
  };
};

export const loadAllUsersInfo = () => {
  return async (dispatch) => {
    const usersInfo = await getUsersByAccountBook();
    dispatch(setUsersInfo(usersInfo));
  };
};

export const loadInviteUsers = () => {
  return async (dispatch) => {
    const inviteUsers = await getInviteUsers();
    dispatch(setInviteUsers(inviteUsers));
  };
};

export const changeUserInfo = (userInfo) => {
  return async (dispatch) => {
    await updateUserInfo(userInfo);
    dispatch(loadAllUsersInfo());
  };
};

export const changeMembers = (newMembers, deleteMembers) => {
  return async (dispatch) => {
    await updateMembers(newMembers, deleteMembers);
    dispatch(loadAllUsersInfo());
    dispatch(loadInviteUsers());
  };
};

export default settingSlice;
