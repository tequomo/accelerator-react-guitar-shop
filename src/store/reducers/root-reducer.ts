import { combineReducers } from '@reduxjs/toolkit';
import { appState } from './app-state/app-state';
import { cartData } from './cart-data/cart-data';
import { currentGuitarData } from './current-guitar-data/current-guitar-data';
import { guitarReviewsData } from './guitar-reviews-data/guitar-reviews-data';
import { guitarsData } from './guitars-data/guitars-data';

export enum NameSpace {
  guitars = 'GUITARS_DATA',
  currentGuitar = 'CURRENT_GUITAR_DATA',
  guitarReviews = 'GUITAR_REVIEWS_DATA',
  cart = 'CART_DATA',
  state = 'STATE',
}

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitarsData,
  [NameSpace.currentGuitar]: currentGuitarData,
  [NameSpace.guitarReviews]: guitarReviewsData,
  [NameSpace.cart]: cartData,
  [NameSpace.state]: appState,
});

export type RootState = ReturnType<typeof rootReducer>;
