import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../../../types/state';
import { loadTotalCountGuitars, setCurrentPage, setFirstLoadState } from '../../action';

export const initialState: AppState = {
  firstLoadState: true,
  totalCountGuitars: 0,
  currentPage: 1,
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(loadTotalCountGuitars, (state, action) => {
      state.totalCountGuitars = action.payload;
    })
    .addCase(setFirstLoadState, (state, action) => {
      state.firstLoadState = action.payload;
    })
    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    });
});

export { appState };
