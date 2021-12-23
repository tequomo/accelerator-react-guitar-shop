import { LoadingStatus } from '../../../const';
import { GuitarType } from '../../../types/guitar-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getGuitars = (state: State): GuitarType[] => state[NameSpace.guitars].guitars;
export const getGuitarsLoadingStatus = (state: State): LoadingStatus => state[NameSpace.guitars].guitarsLoadingStatus;

// export const getFilteredOffers = createSelector(
//   getOffers,
//   getSelectedCity,
//   (offers, selectedCity) => getSelectedCityOffers(offers, selectedCity),
// );

// export const getSortedOffers = createSelector(
//   getCurrentSortingType,
//   getFilteredOffers,
//   (currentSortingType, offers) => sortingOffers(currentSortingType, offers),
// );
