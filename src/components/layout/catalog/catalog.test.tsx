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
import Catalog from './catalog';
import { LoadingStatus } from '../../../const';

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


describe('Component: Catalog', () => {
  it('should render correctly with guitars', () => {
    fakeStore.GUITARS_DATA.guitars = [fakeGuitar];
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();
  });


  it('should render loader when data is loading', () => {
    fakeStore.GUITARS_DATA.guitarsLoadingStatus = LoadingStatus.Loading;
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should dispach an action when fetch guitars', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(dispatch).toBeCalledTimes(2);
  });

});
