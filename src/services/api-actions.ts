import { ApiRoute, LoadingStatus } from '../const';
import { loadCurrentGuitar, loadGuitars, setCurrentGuitarLoadingStatus, setGuitarsLoadingStatus } from '../store/action';
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
