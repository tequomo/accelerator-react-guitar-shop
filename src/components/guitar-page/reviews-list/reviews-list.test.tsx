import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import ReviewsList from './reviews-list';
import { State } from '../../../types/state';
import { getFakeStore } from '../../../utils/mock';

const history = createMemoryHistory();
const onAddReviewClick = jest.fn();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const store = mockStore(fakeStore);

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsList onAddReviewClick={onAddReviewClick}/>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Отзывы');
    expect(screen.getAllByText(/Рейтинг:/i)[0]).toBeInTheDocument();
  });

});
