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
import ModalCartDelete from './modal-cart-delete';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const guitar = getFakeGuitar();
const onModalClose = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();

describe('Component: ModalCartDelete', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalCartDelete isVisible={false} deletingGuitar={guitar} onModalClose={onModalClose}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();

  });

  it('should render button correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalCartDelete isVisible={false} deletingGuitar={guitar} onModalClose={onModalClose}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();

  });


});
