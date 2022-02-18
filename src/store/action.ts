import { createAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '../const';
import { ActionType } from '../types/action';
import { ReviewType } from '../types/review-type';
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

export const loadGuitarReviews = createAction(
  ActionType.LoadGuitarReviews,
  (guitarReviews: ReviewType[]) => ({
    payload: guitarReviews,
  }),
);

export const setGuitarReviewsLoadingStatus = createAction(
  ActionType.SetGuitarReviewsLoadingStatus,
  (guitarReviewsLoadingStatus: LoadingStatus) => ({
    payload: guitarReviewsLoadingStatus,
  }),
);

export const loadMinMaxPriceValues = createAction(
  ActionType.LoadMinMaxPriceValues,
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

export const setCurrentPage = createAction(
  ActionType.SetCurrentPage,
  (currentPage: number) => ({
    payload: currentPage,
  }),
);
