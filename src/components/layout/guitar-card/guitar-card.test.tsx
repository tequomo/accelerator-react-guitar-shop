import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { createAPI } from '../../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeGuitar, getFakeStore } from '../../../utils/mock';
import { State } from '../../../types/state';
import { AppRoute } from '../../../const';
import userEvent from '@testing-library/user-event';
import GuitarCard from './guitar-card';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const guitar = getFakeGuitar();
const onFakeButtonClick = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const store = mockStore(fakeStore);

describe('Component: GuitarCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <GuitarCard guitar={guitar} onAddCartClick={onFakeButtonClick}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByAltText(guitar.name)).toBeInTheDocument();

  });

  it('should redirect and update dom when user click on link', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <GuitarCard guitar={guitar} onAddCartClick={onFakeButtonClick} />
          </Route>
          <Route path={AppRoute.GuitarRoom} render ={() => (<h1>This is guitar page</h1>)}>
          </Route>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Подробнее/i));

    expect(screen.getByText(/This is guitar page/i)).toBeInTheDocument();
    expect(history.location.pathname).toEqual(`${AppRoute.Guitar}${guitar.id}`);

  });

  it('should call callback when user click on buy button', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <GuitarCard guitar={guitar} onAddCartClick={onFakeButtonClick} />
          </Route>
          <Route path={AppRoute.GuitarRoom} render ={() => (<h1>This is guitar page</h1>)}>
          </Route>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText('Купить'));
    expect(onFakeButtonClick).toBeCalledTimes(1);
  });

});
