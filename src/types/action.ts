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
  LoadGuitarReviews = 'data/loadGuitarReviews',
  LoadTotalCountReviews = 'data/loadTotalCountReviews',
  UpdateReviews = 'data/updateReviews',
  SetGuitarReviewsLoadingStatus = 'data/setGuitarReviewsLoadingStatus',
  SetUploadReviewLoadingStatus = 'data/setUploadReviewLoadingStatus',
  DoSearchRequest = 'data/doSearchRequest',
  SetSearchResultLoadingStatus = 'data/setSearchResultLoadingStatus',
  LoadTotalCountGuitars = 'data/loadTotalCountGuitars',
  AddItemToCart = 'data/addItemToCart',
  RemoveItemFromCart = 'data/removeItemFromCart',
  RemoveGuitarFromCart = 'data/removeGuitarFromCart',
  ChangeCartItemCount = 'data/changeCartItemCount',
  LoadCartItems = 'data/loadCartItems',
  LoadCoupon = 'data/loadCoupon',
  LoadDiscount = 'data/loadDiscount',
  SetDiscountLoadingStatus = 'data/setDiscountLoadingStatus',
  SetOrderLodingStatus = 'data/setOrderLoadingStatus',
  ClearCart = 'data/clearCart',
  SetFirstLoadState = 'main/setFirstLoadState',
  SetCurrentPage = 'main/setCurrentPage',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
