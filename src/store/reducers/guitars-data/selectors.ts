import { LoadingStatus } from '../../../const';
import { GuitarType } from '../../../types/guitar-type';
import { MinMaxPriceValuesType, State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getGuitars = (state: State): GuitarType[] => state[NameSpace.guitars].guitars;
export const getGuitarsLoadingStatus = (state: State): LoadingStatus => state[NameSpace.guitars].guitarsLoadingStatus;
export const getSearchGuitars = (state: State): GuitarType[] |null => state[NameSpace.guitars].searchResult;
export const getSearchLoadingStatus = (state: State): LoadingStatus => state[NameSpace.guitars].searchResultLoadingStatus;
export const getMinMaxPriceValues = (state: State): MinMaxPriceValuesType => state[NameSpace.guitars].minMaxPriceValues;
export const getPriceValuesLoadingStatus = (state: State): LoadingStatus => state[NameSpace.guitars].priceValuesLoadingStatus;


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
