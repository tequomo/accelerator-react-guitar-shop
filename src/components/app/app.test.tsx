import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeStore } from '../../utils/mock';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { AppRoute } from '../../const';
import App from './app';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

function getFakeApp (): JSX.Element {
  const fakeStore = getFakeStore();
  const store = mockStore(fakeStore);
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

describe('Application routing', () => {
  it('should render MainPage when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(getFakeApp());

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render CartPage when user navigate to "/cart"', () => {
    history.push(AppRoute.Cart);
    render(getFakeApp());

    expect(screen.getAllByText('Корзина')[0]).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });

  it('should render GuitarPage when user navigate to "/guitars/:id"', () => {
    history.push(`${AppRoute.GuitarQuery}/1`);
    render(getFakeApp());
    expect(screen.getAllByText(/Товар/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Отзывы/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to incorrect route', () => {
    history.push('/incorrect');
    render(getFakeApp());
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
