import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeGuitar, getFakeStore } from '../../../utils/mock';
import { State } from '../../../types/state';
import Pagination from './pagination';
import { datatype } from 'faker';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const fakeGuitar = getFakeGuitar();


describe('Component: Pagination', () => {
  it('should render correctly with guitars', () => {
    fakeStore.GUITARS_DATA.guitars = [fakeGuitar];
    fakeStore.STATE.totalCountGuitars = datatype.number();
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByTestId('pageItem')[0]).toBeInTheDocument();
  });

  it('should dispatch an action when user click on page', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    fakeStore.STATE.totalCountGuitars = datatype.number();
    fakeStore.STATE.firstLoadState = false;

    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getAllByTestId('pageItem')[0]);

    expect(dispatch).toBeCalledTimes(1);
  });

});
