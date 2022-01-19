import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { createAPI } from '../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeStore } from '../../../utils/mock';
import { State } from '../../../types/state';
import Breadcrumbs from './breadcrumbs';
import userEvent from '@testing-library/user-event';
import { AppRoute } from '../../../const';

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

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Breadcrumbs />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toBeInTheDocument();

  });

  it('should redirect and update dom when user click on link', () => {
    render(
      <Router history={history}>
        <Route>
          <Breadcrumbs />
        </Route>
        <Route path={AppRoute.Main} render ={() => (<h1>MainPage</h1>)}>
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByText(/Главная/));

    expect(screen.getByText(/MainPage/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/');

  });

});
