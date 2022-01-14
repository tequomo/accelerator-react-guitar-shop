import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  SetGuitarsLoadingStatus = 'data/setGuitarsLoadingStatus',
  GetMinMaxPriceValues = 'data/getMinMaxPriceValues',
  SetPriceValuesLoadingStatus = 'data/setPriceValuesLoadingStatus',
  LoadCurrentGuitar = 'data/loadCurrentGuitar',
  SetCurrentGuitarLoadingStatus = 'data/setCurrentGuitarLoadingStatus',
  RedirectToRoute = 'main/redirectToRoute',
  DoSearchRequest = 'data/doSearchRequest',
  SetSearchResultLoadingStatus = 'data/setSearchResultLoadingStatus',
  LoadTotalCountGuitars = 'data/loadTotalCountGuitars',
  SetFirstLoadState = 'main/setFirstLoadState',
  SetCurrentPage = 'main/setCurrentPage',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
