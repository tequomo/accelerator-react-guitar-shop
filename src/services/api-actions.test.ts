/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {ApiRoute, AppRoute, HttpCode, LoadingStatus, maxPriceGuitarQuery, minPriceGuitarQuery} from '../const';
import {State} from '../types/state';
import { getFakeGuitar, getFakeGuitars, getFakeStore } from '../utils/mock';
import { fetchCurrentGuitarAction, fetchGuitarsAction, fetchMinMaxPriceValuesAction, fetchSearchGuitarAction } from './api-actions';
import { doSearchRequest, loadCurrentGuitar, loadGuitars, loadMinMaxPriceValues, loadTotalCountGuitars, setCurrentGuitarLoadingStatus, setGuitarsLoadingStatus, setPriceValuesLoadingStatus, setSearchResultLoadingStatus } from '../store/action';
import { datatype } from 'faker';

enum FakeParamsData {
  GuitarId = '2',
}

describe('Api actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeStore = getFakeStore();
  const fakeGuitars = getFakeGuitars();
  const fakeTotalGuitars = datatype.number();
  const fakeGuitar = getFakeGuitar();

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  describe('Fetching guitars actions', () => {

    it('should load guitars and change guitarsLoadingStatus when GET /guitars', async () => {
      // fakeStore.GUITARS_DATA.guitars = fakeGuitars;
      const store = mockStore(fakeStore);
      console.log(store);
      mockAPI
        .onGet(`${ApiRoute.Guitars}?_embed=comments`)
        .reply(HttpCode.Ok, fakeGuitars);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchGuitarsAction());

      await expect(store.getActions()).toEqual([
        loadTotalCountGuitars(fakeTotalGuitars),
        loadGuitars(fakeGuitars),
        setGuitarsLoadingStatus(LoadingStatus.Succeeded),
      ]);

    });

    // it('should change guitarsLoadingStatus to failed when GET /guitars', async () => {
    //   const store = mockStore(fakeStore);

    //   mockAPI
    //     .onGet(ApiRoute.Guitars)
    //     .reply(HttpCode.NotFound, []);

    //   expect(store.getActions()).toEqual([]);

    //   await store.dispatch(fetchGuitarsAction());

    //   expect(store.getActions()).toEqual([
    //     setGuitarsLoadingStatus(LoadingStatus.Failed),
    //   ]);
    // });

  });

  // describe('Fetching current guitar actions', () => {

  //   it('should load current guitar and change currentGuitarLoadingStatus when GET /guitars/:id', async () => {
  //     const store = mockStore(fakeStore);

  //     mockAPI
  //       .onGet(`${ApiRoute.Guitars}/${FakeParamsData.GuitarId}`)
  //       .reply(HttpCode.Ok, fakeGuitar);

  //     expect(store.getActions()).toEqual([]);

  //     await store.dispatch(fetchCurrentGuitarAction(FakeParamsData.GuitarId));

  //     expect(store.getActions())
  //       .toEqual([
  //         loadCurrentGuitar(fakeGuitar),
  //         setCurrentGuitarLoadingStatus(LoadingStatus.Succeeded),
  //       ]);
  //   });

  //   it('should change currentOfferLoadingStatus to failed when GET /guitars/:id', async () => {
  //     const store = mockStore(fakeStore);

  //     mockAPI
  //       .onGet(`${ApiRoute.Guitars}/${FakeParamsData.GuitarId}`)
  //       .reply(HttpCode.NotFound, []);

  //     expect(store.getActions()).toEqual([]);

  //     await store.dispatch(fetchCurrentGuitarAction(FakeParamsData.GuitarId));

  //     expect(store.getActions())
  //       .toEqual([
  //         setCurrentGuitarLoadingStatus(LoadingStatus.Failed),
  //       ]);
  //   });

  // });

  // describe('Fetching min and max price guitars actions', () => {

    // it('should load min and max price guitars and change priceValuesLoadingStatus', async () => {
    //   const store = mockStore(fakeStore);

    //   mockAPI
    //     .onGet(`${ApiRoute.Guitars}${minPriceGuitarQuery}`)
    //     .reply(HttpCode.Ok, fakeGuitar)
    //     .onGet(`${ApiRoute.Guitars}${maxPriceGuitarQuery}`)
    //     .reply(HttpCode.Ok, fakeGuitar);

    //   expect(store.getActions()).toEqual([]);

    //   await store.dispatch(fetchMinMaxPriceValuesAction(''));

    //   expect(store.getActions()).toEqual([
    //     loadMinMaxPriceValues({
    //       priceMin: fakeGuitar.price,
    //       priceMax: fakeGuitar.price,
    //     }),
    //     setPriceValuesLoadingStatus(LoadingStatus.Succeeded),
    //   ]);
    // });

    // it('should change priceValuesLoadingStatus to failed when GET min and max price guitars', async () => {
    //   const store = mockStore(fakeStore);

    //   mockAPI
    //     .onGet(`${ApiRoute.Guitars}${minPriceGuitarQuery}`)
    //     .reply(HttpCode.NotFound, []);

    //   expect(store.getActions()).toEqual([]);

    //   await store.dispatch(fetchMinMaxPriceValuesAction(''));

    //   expect(store.getActions()).toEqual([
    //     setPriceValuesLoadingStatus(LoadingStatus.Failed),
    //   ]);
    // });

  // });

  // describe('Fetching search result actions', () => {

  //   it('should load guitars and change searchResultLoadingStatus when doing search', async () => {
  //     fakeStore.GUITARS_DATA.searchResult = [fakeGuitar];
  //     const store = mockStore(fakeStore);

  //     mockAPI
  //       .onGet(`${ApiRoute.Guitars}/${FakeParamsData.GuitarId}`)
  //       .reply(HttpCode.Ok, fakeGuitar);

  //     expect(store.getActions()).toEqual([]);

  //     await store.dispatch(fetchSearchGuitarAction(FakeParamsData.GuitarId));

  //     expect(store.getActions())
  //       .toEqual([
  //         doSearchRequest([fakeGuitar]),
  //         setSearchResultLoadingStatus(LoadingStatus.Succeeded),
  //       ]);
  //   });

    //   it('should change offerReviewsLoadingStatus to failed when when doing search', async () => {
    //     const store = mockStore();

    //     mockAPI
    //       .onGet(`${ApiRoute.Reviews}/${FakeParamsData.OfferId}`)
    //       .reply(HttpCode.BadRequest, []);

    //     expect(store.getActions()).toEqual([]);

    //     await store.dispatch(fetchOfferReviewsAction(FakeParamsData.OfferId));

    //     expect(store.getActions())
    //       .toEqual([
    //         setOfferReviewsLoadingStatus(LoadingStatus.Failed),
    //       ]);
    //   });

  // });

});
