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
import { AppRoute } from '../../../const';
import userEvent from '@testing-library/user-event';
import Header from './header';

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

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toBeInTheDocument();

  });

  it('should redirect and update dom when user click on link', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <Header />
          </Route>
          <Route path={AppRoute.Main} render ={() => (<h1>This is MainPage</h1>)}>
          </Route>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByAltText(/Логотип/i));

    expect(screen.getByText(/This is MainPage/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/');
  });

});
