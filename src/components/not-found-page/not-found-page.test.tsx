import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeStore } from '../../utils/mock';
import { State } from '../../types/state';
import NotFoundPage from './not-found-page';
import { AppRoute } from '../../const';

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

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText('404')).toBeInTheDocument();
    expect(screen.getByText(/Страница не найдена./i)).toBeInTheDocument();
  });

  it('should return to MainPage when user clicked on link', async () => {
    history.push = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundPage />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Вернуться на главную./i));

    expect(screen.getAllByRole('link')[0]).toBeInTheDocument();
    expect(history.push).toHaveBeenCalledWith(AppRoute.Main);
  });

});
