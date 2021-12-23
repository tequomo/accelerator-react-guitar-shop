import { combineReducers } from '@reduxjs/toolkit';
import { currentGuitarData } from './current-guitar-data/current-guitar-data';
import { guitarsData } from './guitars-data/guitars-data';

export enum NameSpace {
  guitars = 'GUITARS_DATA',
  currentGuitar = 'CURRENT_GUITAR_DATA',
  reviews = 'REVIEWS_DATA',
  state = 'STATE',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
  [NameSpace.currentGuitar]: currentGuitarData,
  // [NameSpace.reviews]: reviewsData,
  // [NameSpace.state]: appState,
});

export type RootState = ReturnType<typeof rootReducer>;
