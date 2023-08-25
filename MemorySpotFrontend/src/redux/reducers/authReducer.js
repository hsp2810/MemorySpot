import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  homeUser: null,
  registeredUser: null,
};

export const authReducer = createReducer(initialState, {
  loginRequest: state => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.isLogin = true;
    state.homeUser = action.payload.homeUser;
    state.loading = false;
    state.alert = action.payload.alert;
  },
  loginFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  authRequest: state => {
    state.loading = true;
  },
  authSuccess: (state, action) => {
    state.isLogin = true;
    state.homeUser = action.payload.homeUser;
    state.loading = false;
    state.alert = action.payload.alert;
  },
  authFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // register
  registerRequest: state => {
    state.loading = true;
  },
  registerSuccess: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
    state.registeredUser = action.payload.registeredUser;
  },
  registerFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload;
  },

  // logout
  logoutRequest: state => {
    state.loading = true;
  },
  logoutSuccess: (state, action) => {
    state.loading = false;
    state.isLogin = false;
    state.alert = action.payload;
  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload;
  },
});

export default initialState.homeUser;
