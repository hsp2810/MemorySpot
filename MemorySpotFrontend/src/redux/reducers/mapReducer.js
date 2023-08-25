import { createReducer } from '@reduxjs/toolkit';
import { memories } from '../../services/tempData.js';

const initialData = {
  memories: memories,
  userLongitude: 0,
  userLatitude: 0,
  userAddress: '',
  markers: [],
  memoriesToShow: [],
};

export const mapReducer = createReducer(initialData, {
  setMemories: (state, action) => {
    state.memories = action.payload;
  },

  setMarkers: (state, action) => {
    state.markers = [...state.markers, action.payload.marker];
  },

  setMemoriesToShow: (state, action) => {
    state.memoriesToShow = action.payload;
  },

  setUserLongitude: (state, action) => {
    state.userLongitude = action.payload;
  },

  setUserLatitude: (state, action) => {
    state.userLatitude = action.payload;
  },

  setUserAddress: (state, action) => {
    state.userAddress = action.payload;
  },
});
