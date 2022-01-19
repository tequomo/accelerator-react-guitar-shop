import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeGuitar, getFakeStore } from '../../../../utils/mock';
import { State } from '../../../../types/state';
import userEvent from '@testing-library/user-event';
import FormSearch from './form-search';
import * as Redux from 'react-redux';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const guitar = getFakeGuitar();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();

  });

  it('should dispach an action and display result when fetch search query', () => {
    fakeStore.GUITARS_DATA.searchResult = [guitar];
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('search'), guitar.name);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);

    listItems.forEach((_item) => {
      expect(screen.getByText(guitar.name)).toBeInTheDocument();
    });

    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action and display information when fetch mismatched search query', () => {
    fakeStore.GUITARS_DATA.searchResult = [];
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <FormSearch />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('search'), guitar.name);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);

    listItems.forEach((_item) => {
      expect(screen.getByText(/Ничего не нашлось/i)).toBeInTheDocument();
    });

    expect(dispatch).toBeCalledTimes(1);
  });

});
