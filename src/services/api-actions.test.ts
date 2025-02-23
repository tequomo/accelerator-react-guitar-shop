import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { ApiRoute, HttpCode, LoadingStatus, PRICE_INTERVAL_QUERY } from '../const';
import { State } from '../types/state';
import { getFakeGuitar, getFakeGuitars, getFakeReviews, getFakeStore } from '../utils/mock';
import {
  fetchGuitarsAction,
  fetchSearchGuitarAction,
  fetchCurrentGuitarAction,
  fetchMinMaxPriceValuesAction,
  fetchGuitarReviewsAction,
  postCouponAction,
  postOrderAction
} from './api-actions';
import {
  loadGuitars,
  doSearchRequest,
  loadCurrentGuitar,
  loadTotalCountGuitars,
  loadMinMaxPriceValues,
  setGuitarsLoadingStatus,
  setPriceValuesLoadingStatus,
  setSearchResultLoadingStatus,
  setCurrentGuitarLoadingStatus,
  setGuitarReviewsLoadingStatus,
  loadTotalCountReviews,
  loadGuitarReviews,
  loadDiscount,
  loadCoupon,
  setDiscountLoadingStatus,
  setOrderLoadingStatus
} from '../store/action';
import { datatype } from 'faker';

enum FakeParamsData {
  GuitarId = '2',
  EmbedComments = '_embed=comments'
}

describe('Api actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeStore = getFakeStore();
  const fakeGuitars = getFakeGuitars();
  const fakeGuitar = getFakeGuitar();
  const fakeReviews = getFakeReviews();

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  const store = mockStore(fakeStore);

  beforeEach(() => {
    mockAPI.reset();
    store.clearActions();
  });

  describe('Fetching guitars actions', () => {

    it('should load guitars and change guitarsLoadingStatus when GET /guitars', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}?${FakeParamsData.EmbedComments}`)
        .reply(
          HttpCode.Ok,
          fakeGuitars,
          { 'x-total-count': fakeGuitars.length.toString() },
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchGuitarsAction());

      expect(store.getActions())
        .toEqual([
          setGuitarsLoadingStatus(LoadingStatus.Loading),
          loadTotalCountGuitars(fakeGuitars.length),
          loadGuitars(fakeGuitars),
          setGuitarsLoadingStatus(LoadingStatus.Succeeded),
        ]);

    });

    it('should change guitarsLoadingStatus to failed when GET /guitars', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}?${FakeParamsData.EmbedComments}`)
        .reply(
          HttpCode.NotFound,
          [],
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchGuitarsAction());

      expect(store.getActions()).toEqual([
        setGuitarsLoadingStatus(LoadingStatus.Loading),
        setGuitarsLoadingStatus(LoadingStatus.Failed),
      ]);
    });

  });

  describe('Fetching current guitar actions', () => {

    it('should load current guitar and change currentGuitarLoadingStatus when GET /guitars/:id', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}/${FakeParamsData.GuitarId}?${FakeParamsData.EmbedComments}`)
        .reply(
          HttpCode.Ok,
          fakeGuitar,
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCurrentGuitarAction(FakeParamsData.GuitarId));

      expect(store.getActions())
        .toEqual([
          loadCurrentGuitar(fakeGuitar),
          setCurrentGuitarLoadingStatus(LoadingStatus.Succeeded),
        ]);
    });

    it('should change currentOfferLoadingStatus to failed when GET /guitars/:id', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}/${FakeParamsData.GuitarId}`)
        .reply(
          HttpCode.NotFound,
          [],
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchCurrentGuitarAction(FakeParamsData.GuitarId));

      expect(store.getActions())
        .toEqual([
          setCurrentGuitarLoadingStatus(LoadingStatus.Failed),
        ]);
    });

  });

  describe('Fetching min and max price guitars actions', () => {

    it('should load min and max price guitars and change priceValuesLoadingStatus', async () => {
      const fakeFilteredGuitars = getFakeGuitars();
      mockAPI
        .onGet(`${ApiRoute.Guitars}${PRICE_INTERVAL_QUERY}&`)
        .reply(HttpCode.Ok, fakeFilteredGuitars);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchMinMaxPriceValuesAction(''));

      const minMaxPriceValues = {
        priceMin: fakeFilteredGuitars[0].price,
        priceMax: fakeFilteredGuitars[fakeFilteredGuitars.length - 1].price,
      };

      expect(store.getActions()).toEqual([
        loadMinMaxPriceValues(minMaxPriceValues),
        setPriceValuesLoadingStatus(LoadingStatus.Succeeded),
      ]);
    });

    it('should change priceValuesLoadingStatus to failed when GET min and max price guitars', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}${PRICE_INTERVAL_QUERY}&`)
        .reply(HttpCode.NotFound, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchMinMaxPriceValuesAction(''));

      expect(store.getActions()).toEqual([
        setPriceValuesLoadingStatus(LoadingStatus.Failed),
      ]);
    });

  });

  describe('Fetching search result actions', () => {

    it('should load null and change searchResultLoadingStatus when query is empty', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}?name_like=''`)
        .reply(HttpCode.Ok,
          [fakeGuitar, fakeGuitar],
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchSearchGuitarAction(''));

      expect(store.getActions())
        .toEqual([
          setSearchResultLoadingStatus(LoadingStatus.Loading),
          doSearchRequest(null),
          setSearchResultLoadingStatus(LoadingStatus.Succeeded),
        ]);
    });

    it('should load search result and change searchResultLoadingStatus when doing search', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}?name_like=${fakeGuitar.name}`)
        .reply(HttpCode.Ok,
          [fakeGuitar, fakeGuitar],
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchSearchGuitarAction(fakeGuitar.name));

      expect(store.getActions())
        .toEqual([
          setSearchResultLoadingStatus(LoadingStatus.Loading),
          doSearchRequest([fakeGuitar, fakeGuitar]),
          setSearchResultLoadingStatus(LoadingStatus.Succeeded),
        ]);
    });

    it('should change offerReviewsLoadingStatus to failed when cause network error', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}?name_like=${fakeGuitar.name}`)
        .networkError();

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchSearchGuitarAction(fakeGuitar.name));

      expect(store.getActions())
        .toEqual([
          setSearchResultLoadingStatus(LoadingStatus.Loading),
          setSearchResultLoadingStatus(LoadingStatus.Failed),
        ]);
    });

  });

  describe('Fetching reviews actions', () => {

    it('should load reviews and change guitarReviewsLoadingStatus when GET /comments', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}/1${ApiRoute.Comments}?_limit=3&_sort=createAt&_order=desc`)
        .reply(
          HttpCode.Ok,
          fakeReviews,
          { 'x-total-count': fakeReviews.length.toString() },
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchGuitarReviewsAction('1', 3));

      expect(store.getActions())
        .toEqual([
          loadTotalCountReviews(fakeReviews.length),
          loadGuitarReviews(fakeReviews),
          setGuitarReviewsLoadingStatus(LoadingStatus.Succeeded),
        ]);

    });

    it('should change guitarReviewsLoadingStatus to failed when GET /comments', async () => {
      mockAPI
        .onGet(`${ApiRoute.Guitars}/1${ApiRoute.Comments}?_limit=3&_sort=createAt&_order=desc`)
        .reply(
          HttpCode.NotFound,
          [],
        );

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchGuitarReviewsAction('1', 3));

      expect(store.getActions()).toEqual([
        setGuitarReviewsLoadingStatus(LoadingStatus.Failed),
      ]);
    });

  });

  it('should load discount and change discountLoadingStatus when POST /coupons', async () => {
    const fakeDiscount = datatype.number();
    const fakeCoupon = datatype.string();
    mockAPI
      .onPost(
        ApiRoute.Coupons,
        {coupon: fakeCoupon} )
      .reply(
        HttpCode.Ok,
        fakeDiscount,
      );

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postCouponAction({coupon: fakeCoupon}));

    expect(store.getActions())
      .toEqual([
        setDiscountLoadingStatus(LoadingStatus.Loading),
        loadDiscount(fakeDiscount),
        loadCoupon(fakeCoupon),
        setDiscountLoadingStatus(LoadingStatus.Succeeded),
      ]);

  });

  it('should sent order and change orderLoadingStatus when POST /orders', async () => {
    const fakeId = datatype.number();
    const fakeCoupon = datatype.string();
    mockAPI
      .onPost(
        ApiRoute.Orders,
        {guitarsIds: [fakeId], coupon: fakeCoupon} )
      .reply(
        HttpCode.Created,
      );

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postOrderAction({guitarsIds: [fakeId], coupon: fakeCoupon}));

    expect(store.getActions())
      .toEqual([
        setOrderLoadingStatus(LoadingStatus.Loading),
        setOrderLoadingStatus(LoadingStatus.Succeeded),
      ]);

  });

});
