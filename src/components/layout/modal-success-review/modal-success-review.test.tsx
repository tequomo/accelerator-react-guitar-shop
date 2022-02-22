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
import ModalSuccessReview from './modal-success-review';

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

describe('Component: ModalSuccessReview', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessReview isVisible={false} onModalClose={onModalClose}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();

  });

  it('should call callback when user click on close button', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessReview isVisible={false} onModalClose={onModalClose}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByLabelText('Закрыть'));
    expect(onModalClose).toBeCalledTimes(1);
  });

});
