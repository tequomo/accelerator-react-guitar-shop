import { LoadingStatus } from '../const';
import { RootState } from '../store/reducers/root-reducer';
import { GuitarType } from './guitar-type';
import { ReviewType } from './review-type';

export type MinMaxPriceValuesType = {
  priceMin: number,
  priceMax: number,
}

export type GuitarsData = {
  guitars: GuitarType[],
  guitarsLoadingStatus: LoadingStatus,
  minMaxPriceValues: MinMaxPriceValuesType,
  priceValuesLoadingStatus: LoadingStatus,
  searchResult: GuitarType[] | null,
  searchResultLoadingStatus: LoadingStatus,
}

export type CurrentGuitarData = {
  currentGuitar: GuitarType | null,
  currentGuitarLoadingStatus: LoadingStatus,
}

export type GuitarReviewsData = {
  guitarReviews: ReviewType[] | [],
  guitarReviewsLoadingStatus: LoadingStatus,
}

export type AppState = {
  firstLoadState: boolean,
  totalCountGuitars: number,
  currentPage: number,
}

export type State = RootState;
