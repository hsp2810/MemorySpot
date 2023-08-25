import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  allUsers: [],
  user: null,
};

export const userReducer = createReducer(initialState, {
  fetchAllUsersRequest: state => {
    state.loading = true;
  },
  fetchAllUsersSuccess: (state, action) => {
    state.allUsers = action.payload.users;
    state.loading = false;
    state.alert = action.payload.alert;
  },
  fetchAllUsersFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  fetchUserByUsernameRequest: state => {
    state.loading = true;
  },
  fetchUserByUsernameSuccess: (state, action) => {
    state.user = action.payload.user;
    state.loading = false;
    state.alert = action.payload.alert;
  },
  fetchUserByUsernameFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },
});
