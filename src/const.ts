export enum AppRoute {
  Main = '/',
  GuitarQuery = '/guitars',
  Guitar = '/guitars/',
  GuitarRoom = '/guitars/:id',
  Cart = '/cart',
}

export enum ApiRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum HttpCode {
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
}

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export const CARDS_PER_PAGE = 9;

export const IMG_BASE_PATH = 'content';

export const MAX_RATING_VALUE = 5;

export const REQUEST_DELAY = 500;

export enum SortingType {
  Price = 'price',
  Rating = 'rating',
}

export enum SortingOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export const minPriceGuitarQuery = '?_start=0&_end=1&_sort=price&_order=asc';
export const maxPriceGuitarQuery = '?_start=0&_end=1&_sort=price&_order=desc';

export const guitarsByType = ['acoustic', 'electric', 'ukulele'];

export const guitarTypeName: {[key: string]: string} = {
  Acoustic: 'Акустические гитары',
  Electric: 'Электрогитары',
  Ukulele: 'Укулеле',
};

export const priceQueryKey: {[key: string]: string} = {
  priceFrom: 'price_gte',
  priceTo: 'price_lte',
};

export const stringCountByType = {
  Acoustic: [6, 7, 12],
  Electric: [4, 6, 7],
  Ukulele: [4],
};

export const guitarTypes = [
  {
    type: 'acoustic',
    name: 'Акустические гитары',
    stringCount: [6, 7, 12],
  },
  {
    type: 'electric',
    name: 'Электрогитары',
    stringCount: [4, 6, 7],
  },
  {
    type: 'ukulele',
    name: 'Укулеле',
    stringCount: [4],
  },
];
