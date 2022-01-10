import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../../../types/state';
import { loadTotalCountGuitars, setFirstLoadState } from '../../action';

const initialState: AppState = {
  firstLoadState: true,
  totalCountGuitars: 0,
};

const appState = createReducer(initialState, (builder) => {
  builder
    .addCase(loadTotalCountGuitars, (state, action) => {
      state.totalCountGuitars = action.payload;
    })
    .addCase(setFirstLoadState, (state, action) => {
      state.firstLoadState = action.payload;
    });
});

export { appState };
