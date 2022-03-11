import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeStore } from '../../utils/mock';
import { State } from '../../types/state';
import GuitarPage from './guitar-page';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const store = mockStore(fakeStore);

describe('Component: GuitarPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Рейтинг:/i)[0]).toBeInTheDocument();
  });

});
