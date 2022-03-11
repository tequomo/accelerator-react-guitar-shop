import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../../services/api';
import CartFooter from './cart-footer';
import { State } from '../../../types/state';
import { getFakeStore } from '../../../utils/mock';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const store = mockStore(fakeStore);
const fakeTotalPrice = datatype.number();
const onOrderSuccess = jest.fn();

describe('Component: CartFooter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartFooter totalPrice={fakeTotalPrice} onOrderSuccess={onOrderSuccess} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

});
