import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
};

export const friendsReducer = createReducer(initialState, {
  fetchFriendsRequest: state => {
    state.loading = true;
  },
  fetchFriendsSuccess: (state, action) => {
    state.friends = action.payload.friends;
    state.loading = false;
    state.alert = action.payload.alert;
  },
  fetchFriendsFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  removeFriendRequest: state => {
    state.loading = true;
  },
  removeFriendSuccess: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },
  removeFriendFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  addFriendRequest: state => {
    state.loading = true;
  },
  addFriendSuccess: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },
  addFriendFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  clearError: state => {
    state.alert = null;
  },
});
