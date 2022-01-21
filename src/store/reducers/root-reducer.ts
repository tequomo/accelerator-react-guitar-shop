import { combineReducers } from '@reduxjs/toolkit';
import { appState } from './app-state/app-state';
import { currentGuitarData } from './current-guitar-data/current-guitar-data';
import { guitarsData } from './guitars-data/guitars-data';

export enum NameSpace {
  guitars = 'GUITARS_DATA',
  currentGuitar = 'CURRENT_GUITAR_DATA',
  state = 'STATE',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
  [NameSpace.currentGuitar]: currentGuitarData,
  [NameSpace.state]: appState,
});

export type RootState = ReturnType<typeof rootReducer>;
