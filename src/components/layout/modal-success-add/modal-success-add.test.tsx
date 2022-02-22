import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeStore } from '../../../utils/mock';
import { State } from '../../../types/state';
import userEvent from '@testing-library/user-event';
import ModalSuccessAdd from './modal-success-add';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const onModalClose = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();

describe('Component: ModalSuccessAdd', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessAdd isVisible={false} onModalClose={onModalClose}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();

  });

  it('should call callback when user click on close button', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessAdd isVisible={false} onModalClose={onModalClose}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByLabelText('Закрыть'));
    expect(onModalClose).toBeCalledTimes(1);
  });

});
