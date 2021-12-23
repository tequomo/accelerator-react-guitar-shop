import { createAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '../const';
import { ActionType } from '../types/action';
import { GuitarType } from '../types/guitar-type';

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

export const setCurrentGuitarLoadingStatus = createAction(
  ActionType.SetCurrentGuitarLoadingStatus,
  (currentGuitarLoadingStatus: LoadingStatus) => ({
    payload: currentGuitarLoadingStatus,
  }),
);
