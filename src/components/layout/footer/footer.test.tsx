import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { createAPI } from '../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeStore } from '../../../utils/mock';
import { State } from '../../../types/state';
import Footer from './footer';
import { AppRoute } from '../../../const';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Footer />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('instagram')).toBeInTheDocument();

  });

  it('should redirect and update dom when user click on link', () => {
    render(
      <Router history={history}>
        <Route>
          <Footer />
        </Route>
        <Route path={AppRoute.Main} render ={() => (<h1>MainPage</h1>)}>
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByAltText(/Логотип/i));

    expect(screen.getByText(/MainPage/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual('/');

  });

});
