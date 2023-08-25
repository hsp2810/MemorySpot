import { createReducer } from '@reduxjs/toolkit';

export const categoryReducer = createReducer([], {
  fetchCategoriesRequest: state => {
    state.loading = true;
  },
  fetchCategoriesSuccess: (state, action) => {
    state.loading = false;
    state.alert = action.payload.alert;
    state.categories = action.payload.categories;
  },
  fetchCategoriesFail: (state, action) => {
    state.loading = false;
    state.alert = action.payload;
  },
});
