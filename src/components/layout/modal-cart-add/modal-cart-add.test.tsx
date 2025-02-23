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
import userEvent from '@testing-library/user-event';
import ModalCartAdd from './modal-cart-add';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const guitar = getFakeGuitar();
const onModalClose = jest.fn();
const onSuccess = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const store = mockStore(fakeStore);

describe('Component: ModalCartAdd', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalCartAdd activeGuitar={guitar} isVisible={false} onModalClose={onModalClose} onSuccess={onSuccess}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();

  });

  it('should call callback when user click on close button', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalCartAdd activeGuitar={guitar} isVisible={false} onModalClose={onModalClose} onSuccess={onSuccess}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByLabelText('Закрыть'));
    expect(onModalClose).toBeCalledTimes(1);
  });

});
