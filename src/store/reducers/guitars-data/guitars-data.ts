import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { GuitarsData } from '../../../types/state';
import {
  loadGuitars,
  doSearchRequest,
  getMinMaxPriceValues,
  setGuitarsLoadingStatus,
  setPriceValuesLoadingStatus,
  setSearchResultLoadingStatus
} from '../../action';

const initialState: GuitarsData = {
  guitars: [],
  guitarsLoadingStatus: LoadingStatus.Idle,
  minMaxPriceValues: {
    priceMin: 0,
    priceMax: 0,
  },
  priceValuesLoadingStatus: LoadingStatus.Idle,
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
    })
    .addCase(getMinMaxPriceValues,(state, action) => {
      state.minMaxPriceValues = action.payload;
    })
    .addCase(setPriceValuesLoadingStatus, (state, action) => {
      state.priceValuesLoadingStatus = action.payload;
    });
});

export { guitarsData };
