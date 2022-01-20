import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  SetGuitarsLoadingStatus = 'data/setGuitarsLoadingStatus',
  LoadMinMaxPriceValues = 'data/loadMinMaxPriceValues',
  SetPriceValuesLoadingStatus = 'data/setPriceValuesLoadingStatus',
  LoadCurrentGuitar = 'data/loadCurrentGuitar',
  SetCurrentGuitarLoadingStatus = 'data/setCurrentGuitarLoadingStatus',
  DoSearchRequest = 'data/doSearchRequest',
  SetSearchResultLoadingStatus = 'data/setSearchResultLoadingStatus',
  LoadTotalCountGuitars = 'data/loadTotalCountGuitars',
  SetFirstLoadState = 'main/setFirstLoadState',
  SetCurrentPage = 'main/setCurrentPage',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
