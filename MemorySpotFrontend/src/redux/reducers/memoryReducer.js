import { createReducer } from '@reduxjs/toolkit';

const initialData = {
  friendsMemories: [],
  friendsList24: [],
  friendMemories24: [],
  memory: null,
  mymemories: [],
  alert: null,
  savedMemories: [],
  userProfileMemories: [],
};

export const memoryReducer = createReducer(initialData, {
  // fetching all the memories of friends to display as markers when the map loads
  friendsMemoriesRequest: (state, action) => {
    state.loading = true;
  },
  friendsMemoriesSuccess: (state, action) => {
    state.loading = false;
    state.friendsMemories = action.payload.memories;
    state.alert = action.payload.alert;
  },
  friendsMemoriesFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // fetching friends memories in the last 24 hours
  friendMemories24Request: (state, action) => {
    state.loading = true;
  },
  friendMemories24Success: (state, action) => {
    state.loading = false;
    state.friendMemories24 = action.payload.memories;
    state.alert = action.payload.alert;
  },
  friendMemories24Fail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // fetching friends list who have uploaded memories in the past 24 hours
  friendsUpMem24Request: (state, action) => {
    state.loading = true;
  },
  friendsUpMem24Success: (state, action) => {
    state.loading = false;
    state.friendsList24 = action.payload.friends;
    state.alert = action.payload.alert;
  },
  friendsUpMem24Fail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // fetching one particular memory using the memory id
  memoryRequest: state => {
    state.loading = true;
  },
  memorySuccess: (state, action) => {
    state.loading = false;
    state.memory = action.payload.memory;
    state.alert = action.payload.alert;
  },
  memoryFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // Uploading the memory
  uploadMemoryRequest: state => {
    state.loading = true;
  },
  uploadMemorySuccess: (state, action) => {
    state.loading = false;
    state.memory = action.payload;
    state.alert = action.payload.alert;
  },
  uploadMemoryFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // fetching the memories that the home user has uploaded
  fetchMyMemoriesRequest: (state, action) => {
    state.loading = true;
  },
  fetchMyMemoriesSuccess: (state, action) => {
    state.loading = false;
    state.mymemories = action.payload.memories;
    state.alert = action.payload.alert;
  },
  fetchMyMemoriesFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // Removing the memories that the home user has uploaded
  removeMyMemRequest: (state, action) => {
    state.loading = true;
  },
  removeMyMemSuccess: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },
  removeMyMemFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // Saving the memories to memory bank
  saveMemoryRequest: (state, action) => {
    state.loading = true;
  },
  saveMemorySuccess: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },
  saveMemoryFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // Fetching the saved memories from the memory bank
  fetchSavedMemoriesRequest: (state, action) => {
    state.loading = true;
  },
  fetchSavedMemoriesSuccess: (state, action) => {
    state.loading = false;
    const filterSaved = action.payload.memories.filter(memory => {
      return memory.memory.length > 0;
    });
    state.savedMemories = filterSaved;
    state.alert = action.payload.alert;
  },
  fetchSavedMemoriesFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  // Fetching the memories of the user we are seeing the profile of
  fetchMemoriesByUserIdRequest: (state, action) => {
    state.loading = true;
  },
  fetchMemoriesByUserIdSuccess: (state, action) => {
    state.loading = false;
    state.userProfileMemories = action.payload.memories;
    state.alert = action.payload.alert;
  },
  fetchMemoriesByUserIdFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
  },

  clearError: state => {
    state.alert = null;
  },
});
