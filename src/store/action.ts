import { createAction } from '@reduxjs/toolkit';
import { AppRoute, LoadingStatus } from '../const';
import { ActionType } from '../types/action';
import { GuitarType } from '../types/guitar-type';
import { MinMaxPriceValuesType } from '../types/state';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: GuitarType[]) => ({
    payload: guitars,
  }),
);

export const loadCurrentGuitar = createAction(
  ActionType.LoadCurrentGuitar,
  (currentGiutar: GuitarType) => ({
    payload: currentGiutar,
  }),
);

export const setGuitarsLoadingStatus = createAction(
  ActionType.SetGuitarsLoadingStatus,
  (guitarsLoadingStatus: LoadingStatus) => ({
    payload: guitarsLoadingStatus,
  }),
);

export const getMinMaxPriceValues = createAction(
  ActionType.GetMinMaxPriceValues,
  (minMaxPriceValues: MinMaxPriceValuesType) => ({
    payload: minMaxPriceValues,
  }),
);

export const setPriceValuesLoadingStatus = createAction(
  ActionType.SetPriceValuesLoadingStatus,
  (priceValuesLoadingStatus: LoadingStatus) => ({
    payload: priceValuesLoadingStatus,
  }),
);

export const setCurrentGuitarLoadingStatus = createAction(
  ActionType.SetCurrentGuitarLoadingStatus,
  (currentGuitarLoadingStatus: LoadingStatus) => ({
    payload: currentGuitarLoadingStatus,
  }),
);

export const doSearchRequest = createAction(
  ActionType.DoSearchRequest,
  (searchResult: GuitarType[] | null) => ({
    payload: searchResult,
  }),
);

export const setSearchResultLoadingStatus = createAction(
  ActionType.SetSearchResultLoadingStatus,
  (searchResultLoadingStatus: LoadingStatus) => ({
    payload: searchResultLoadingStatus,
  }),
);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const loadTotalCountGuitars = createAction(
  ActionType.LoadTotalCountGuitars,
  (totalCountGuitars: number) => ({
    payload: totalCountGuitars,
  }),
);

export const setFirstLoadState = createAction(
  ActionType.SetFirstLoadState,
  (firstLoadState: boolean) => ({
    payload: firstLoadState,
  }),
);
