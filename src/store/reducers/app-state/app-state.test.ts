import { appState } from './app-state';
import { datatype } from 'faker';
import { AppState } from '../../../types/state';
import { loadTotalCountGuitars, setCurrentPage, setFirstLoadState } from '../../action';

const loadState = true;
const countGuitars = datatype.number();
const page = datatype.number();

export const state: AppState = {
  firstLoadState: loadState,
  totalCountGuitars: countGuitars,
  currentPage: page,
};

describe('Reducer: appState', () => {

  it('should change first load state to false', () => {
    expect(appState(state, setFirstLoadState(!loadState)))
      .toEqual({ firstLoadState: false, totalCountGuitars: countGuitars, currentPage: page });
  });

  it('should change count gitars by a given value', () => {
    const anothercountGuitars = datatype.number();
    expect(appState(state, loadTotalCountGuitars(anothercountGuitars)))
      .toEqual({ firstLoadState: loadState, totalCountGuitars: anothercountGuitars, currentPage: page });
  });

  it('should change current page to given value', () => {
    const anotherCurrentPage = datatype.number();
    expect(appState(state, setCurrentPage(anotherCurrentPage)))
      .toEqual({ firstLoadState: loadState, totalCountGuitars: countGuitars, currentPage: anotherCurrentPage });
  });

});
