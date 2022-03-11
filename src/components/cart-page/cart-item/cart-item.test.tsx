import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import { getFakeCartItem, getFakeStore } from '../../../utils/mock';
import CartItem from './cart-item';

const history = createMemoryHistory();
const cartItem = getFakeCartItem();
const onDeleteClick = jest.fn();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const store = mockStore(fakeStore);

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartItem cartItem={cartItem} onDeleteClick={onDeleteClick} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Увеличить количество/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

});
