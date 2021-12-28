import { ByPriceType } from '../components/layout/catalog-filter/catalog-filter';
import { ApiRoute, LoadingStatus } from '../const';
import { doSearchRequest, loadCurrentGuitar, loadGuitars, setCurrentGuitarLoadingStatus, setGuitarsLoadingStatus, setSearchResultLoadingStatus } from '../store/action';
import { ThunkActionResult } from '../types/action';
import { GuitarType } from '../types/guitar-type';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType[]>(ApiRoute.Guitars);
      dispatch(loadGuitars(data));
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
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

export const fetchSortedGuitarsAction = (sortingType: string, order: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}?_sort=${sortingType}&_order=${order}`);
      dispatch(loadGuitars(data));
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

export const fetchFilteredGuitarsAction = ({priceMin, priceMax}: ByPriceType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}?price_gte=${priceMin}&price_lte=${priceMax}`);
      dispatch(loadGuitars(data));
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.OFFER_LOADING_ERROR);
    }
  };

