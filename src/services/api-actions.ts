import { toast } from 'react-toastify';
import { ApiRoute, LoadingStatus, MAX_PRICE_QUERY, Messages, MIN_PRICE_QUERY } from '../const';
import {
  doSearchRequest,
  loadMinMaxPriceValues,
  loadCurrentGuitar,
  loadGuitars,
  loadTotalCountGuitars,
  setCurrentGuitarLoadingStatus,
  setGuitarsLoadingStatus,
  setPriceValuesLoadingStatus,
  setSearchResultLoadingStatus
} from '../store/action';
import { ThunkActionResult } from '../types/action';
import { GuitarType } from '../types/guitar-type';

const TOTAL_COUNT_HEADER = 'x-total-count';

export const fetchGuitarsAction = (queryString=''): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Loading));
      const { data, headers } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}${queryString}${queryString ? '&' : '?'}_embed=comments`);
      dispatch(loadTotalCountGuitars( +headers[TOTAL_COUNT_HEADER] || data.length));
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
      const [min, max] = await Promise.all([
        api.get<GuitarType[]>(`${ApiRoute.Guitars}${MIN_PRICE_QUERY}&${queryString}`),
        api.get<GuitarType[]>(`${ApiRoute.Guitars}${MAX_PRICE_QUERY}&${queryString}`),
      ]);
      dispatch(loadMinMaxPriceValues({
        priceMin: min.data[0].price,
        priceMax: max.data[0].price,
      }));
      dispatch(setPriceValuesLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setPriceValuesLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
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
      toast.error(Messages.LOAD_FAIL);
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
      toast.error(Messages.LOAD_FAIL);
    }
  };
