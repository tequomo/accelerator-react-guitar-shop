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
import CatalogFilter from './catalog-filter';
import { LoadingStatus } from '../../../const';
import { datatype } from 'faker';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const onFakeCallback = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter onPriceChanged={onFakeCallback} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();

  });

  it('should render price input placeholder when price data is loading', () => {
    fakeStore.GUITARS_DATA.priceValuesLoadingStatus = LoadingStatus.Loading;
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter onPriceChanged={onFakeCallback} />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByPlaceholderText('...')[0]).toBeInTheDocument();
  });

  it('should price input placeholder when price data is loaded', () => {
    const fakePrice = datatype.number();
    fakeStore.GUITARS_DATA.minMaxPriceValues.priceMin = fakePrice;
    fakeStore.GUITARS_DATA.priceValuesLoadingStatus = LoadingStatus.Succeeded;
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter onPriceChanged={onFakeCallback}/>
        </Router>
      </Provider>,
    );
    expect(screen.getByPlaceholderText(fakePrice)).toBeInTheDocument();
  });

  it('should 4 strings checkbox be disabled when user select acoustic type checkbox', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <Router history={history}>
          <CatalogFilter  onPriceChanged={onFakeCallback}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getAllByTestId('guitarType')[0]);
    expect(screen.getAllByTestId('guitarStringCount')[0]).toBeDisabled();
  });

});
