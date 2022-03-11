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
import ModalReview from './modal-review';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const guitar = getFakeGuitar();
const fakeCallback = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();

describe('Component: ModalReview', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalReview activeGuitar={guitar} isVisible={false} onModalClose={fakeCallback} onSuccess={fakeCallback}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();

  });

  it('should call callback when user click on close button', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalReview activeGuitar={guitar} isVisible={false} onModalClose={fakeCallback} onSuccess={fakeCallback}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByLabelText('Закрыть'));
    expect(fakeCallback).toBeCalledTimes(3);
  });

});
