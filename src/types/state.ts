import { LoadingStatus } from '../const';
import { RootState } from '../store/reducers/root-reducer';
import { GuitarType } from './guitar-type';

export type GuitarsData = {
  guitars: GuitarType[],
  guitarsLoadingStatus: LoadingStatus,
}

export type CurrentGuitarData = {
  currentGuitar: GuitarType | null,
  currentGuitarLoadingStatus: LoadingStatus,
}

// export type ReviewsData = {
//   offerReviews: ReviewType[],
//   offerReviewsLoadingStatus: LoadingStatus,
//   reviewLoadingStatus: LoadingStatus,
// }

export type AppState = {
  selectedCity: string,
  currentSortingType: string,
}

export type State = RootState;
