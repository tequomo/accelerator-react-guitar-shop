import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { GuitarsData } from '../../../types/state';
import { doSearchRequest, loadGuitars, setGuitarsLoadingStatus, setSearchResultLoadingStatus } from '../../action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsLoadingStatus: LoadingStatus.Idle,
  searchResult: null,
  searchResultLoadingStatus: LoadingStatus.Idle,
};

const guitarsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setGuitarsLoadingStatus, (state, action) => {
      state.guitarsLoadingStatus = action.payload;
    })
    .addCase(doSearchRequest, (state, action) => {
      state.searchResult = action.payload;
    })
    .addCase(setSearchResultLoadingStatus, (state, action) => {
      state.searchResultLoadingStatus = action.payload;
    });
});

export { guitarsData };
