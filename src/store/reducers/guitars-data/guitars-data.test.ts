import { datatype } from 'faker';
import { LoadingStatus } from '../../../const';
import { GuitarsData } from '../../../types/state';
import { getFakeGuitars } from '../../../utils/mock';
import { doSearchRequest, getMinMaxPriceValues, loadGuitars, setGuitarsLoadingStatus, setPriceValuesLoadingStatus, setSearchResultLoadingStatus } from '../../action';
import { guitarsData } from './guitars-data';

const state: GuitarsData = {
  guitars: [],
  guitarsLoadingStatus: LoadingStatus.Idle,
  minMaxPriceValues: {
    priceMin: 0,
    priceMax: 0,
  },
  priceValuesLoadingStatus: LoadingStatus.Idle,
  searchResult: null,
  searchResultLoadingStatus: LoadingStatus.Idle,
};

const guitars = getFakeGuitars();

const minMaxPriceValues = {
  priceMin: datatype.number(),
  priceMax: datatype.number(),
};

describe('Reducer: guitarsData', () => {
  it('with omit parameters should return initial state', () => {
    expect(guitarsData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update state if guitar are loaded', () => {
    expect(guitarsData(state, loadGuitars(guitars)))
      .toEqual({
        ...state,
        guitars: guitars,
      });
  });
  it('should update loading status when guitars are loaded or not loaded', () => {
    expect(guitarsData(state, setGuitarsLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        guitarsLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(guitarsData(state, setGuitarsLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        guitarsLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update state if minimum and maximum price of guitars are loaded', () => {
    expect(guitarsData(state, getMinMaxPriceValues(minMaxPriceValues)))
      .toEqual({
        ...state,
        minMaxPriceValues: minMaxPriceValues,
      });
  });

  it('should update loading status when minimum and maximum price of guitars are loaded or not loaded', () => {
    expect(guitarsData(state, setPriceValuesLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        priceValuesLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(guitarsData(state, setPriceValuesLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        priceValuesLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update state if search result is done', () => {
    expect(guitarsData(state, doSearchRequest(guitars)))
      .toEqual({
        ...state,
        searchResult: guitars,
      });
  });
  it('should update loading status when doing search result', () => {
    expect(guitarsData(state, setSearchResultLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        searchResultLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(guitarsData(state, setSearchResultLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        searchResultLoadingStatus: LoadingStatus.Failed,
      });
  });

});

