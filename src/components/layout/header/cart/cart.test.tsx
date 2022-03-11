import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { createAPI } from '../../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeStore } from '../../../../utils/mock';
import { State } from '../../../../types/state';
import { AppRoute } from '../../../../const';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

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

describe('Component: Cart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Cart />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Корзина')).toBeInTheDocument();

  });

  it('should redirect and update dom when user click on link', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <Cart />
          </Route>
          <Route path={AppRoute.Cart} render ={() => (<h1>This is my basket</h1>)}>
          </Route>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Перейти в корзину/i));

    expect(screen.getByText(/This is my basket/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual(AppRoute.Cart);
  });

});
