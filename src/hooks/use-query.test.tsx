/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getFakeGuitar, getFakeStore } from '../utils/mock';
import { State } from '../types/state';
import { datatype } from 'faker';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
// import App from '../components/app/app';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeStore = getFakeStore();
const fakeGuitar = getFakeGuitar();

describe('Component: Pagination', () => {
  it('clicking filter links updates product query params', () => {
    let testHistory, testLocation;
    render(
      <MemoryRouter>

      </MemoryRouter>,
    );


    //   act(() => {
    //     // example: click a <Link> to /products?id=1234
    //   });

    //   // assert about url
    //   expect(testLocation.pathname).toBe('/products');
    //   const searchParams = new URLSearchParams(testLocation.search);
    //   expect(searchParams.has('id')).toBe(true);
    //   expect(searchParams.get('id')).toEqual('1234');
  });
});
