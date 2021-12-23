import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { GuitarsData } from '../../../types/state';
import { loadGuitars, setGuitarsLoadingStatus } from '../../action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsLoadingStatus: LoadingStatus.Idle,
};

const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setGuitarsLoadingStatus, (state, action) => {
      state.guitarsLoadingStatus = action.payload;
    });
});

export { guitarsData };
