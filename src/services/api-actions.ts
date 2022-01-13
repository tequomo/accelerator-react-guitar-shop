/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { ApiRoute, LoadingStatus, maxPriceGuitarQuery, Messages, minPriceGuitarQuery } from '../const';
import { doSearchRequest, getMinMaxPriceValues, loadCurrentGuitar, loadGuitars, loadTotalCountGuitars, setCurrentGuitarLoadingStatus, setGuitarsLoadingStatus, setPriceValuesLoadingStatus, setSearchResultLoadingStatus } from '../store/action';
import { ThunkActionResult } from '../types/action';
import { GuitarType } from '../types/guitar-type';

const TOTAL_COUNT_HEADER = 'x-total-count';

// export const fetchGuitarsAction = (): ThunkActionResult =>
//   async (dispatch, _getState, api): Promise<void> => {
//     try {
//       const { data } = await api.get<GuitarType[]>(ApiRoute.Guitars);
//       dispatch(loadGuitars(data));
//       dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
//     } catch {
//       dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
//       // toast.error(Messages.OFFER_LOADING_ERROR);
//     }
//   };

export const fetchGuitarsAction = (queryString=''): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data, headers } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}${queryString}${queryString ? '&' : '?'}_embed=comments&_start=0&_end=9`);
      if(headers[TOTAL_COUNT_HEADER]) {
        dispatch(loadTotalCountGuitars(+headers[TOTAL_COUNT_HEADER]));
        console.log(headers[TOTAL_COUNT_HEADER]);
      }
      dispatch(loadGuitars(data));
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
    }
  };

export const fetchMinMaxPriceValuesAction = (queryString: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const minPriceResponse = await api.get<GuitarType[]>(`${ApiRoute.Guitars}${minPriceGuitarQuery}&${queryString}`);
      const minPriceGuitar = minPriceResponse.data.reduce((result, item) => result = item);
      const maxPriceResponse = await api.get<GuitarType[]>(`${ApiRoute.Guitars}${maxPriceGuitarQuery}&${queryString}`);
      const maxPriceGuitar = maxPriceResponse.data.reduce((result, item) => result = item);
      dispatch(getMinMaxPriceValues({
        priceMin: minPriceGuitar.price,
        priceMax: maxPriceGuitar.price,
      }));
      dispatch(setPriceValuesLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setPriceValuesLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const fetchCurrentGuitarAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType>(`${ApiRoute.Guitars}/${id}`);
      dispatch(loadCurrentGuitar(data));
      dispatch(setCurrentGuitarLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setCurrentGuitarLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const fetchSearchGuitarAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setSearchResultLoadingStatus(LoadingStatus.Loading));
      if(!query) {
        dispatch(doSearchRequest(null));
      } else {
        const { data } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}?name_like=${query}`);
        dispatch(doSearchRequest(data));
      }
      dispatch(setSearchResultLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setSearchResultLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const fetchSortedGuitarsAction = (sortingType: string, sortingOrder: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}?_sort=${sortingType}&_order=${sortingOrder}`);
      dispatch(loadGuitars(data));
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const fetchFilteredGuitarsAction = (queryString: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}${queryString}`);
      dispatch(loadGuitars(data));
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };


