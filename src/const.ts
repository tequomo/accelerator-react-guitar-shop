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

// export enum HttpCode {
//   Ok = 200,
//   BadRequest = 400,
//   NotFound = 404,
// }

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

// export const guitarsByType = ['acoustic', 'electric', 'ukulele'];

// export const guitarTypeName: {[key: string]: string} = {
//   Acoustic: 'Акустические гитары',
//   Electric: 'Электрогитары',
//   Ukulele: 'Укулеле',
// };

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
    sectionName: 'Акустические гитары',
    name: 'Акустическая гитара',
    stringCount: [6, 7, 12],
  },
  {
    type: 'electric',
    sectionName: 'Электрогитары',
    name: 'Электрогитара',
    stringCount: [4, 6, 7],
  },
  {
    type: 'ukulele',
    sectionName: 'Укулеле',
    name: 'Укулеле',
    stringCount: [4],
  },
];

// export const urlFilterParams = [
//   'price_gte',
//   'price_lte',
//   'type',
//   'stringCount',
// ];

export const urlFilterParams = {
  PriceFrom:  'price_gte',
  PriceTo: 'price_lte',
  Type: 'type',
  StringCount: 'stringCount',
};

// export const urlSortParams = [
//   'sortingType',
//   'sortingOrder',
// ];

export const urlSortParams = {
  SortingType: '_sort',
  SortingOrder: '_order',
};

export const urlPaginationParams = {
  Start: '_start',
  End: '_end',
};

export const Messages = {
  LOAD_FAIL: 'Загрузка данных не удалась. Возможно, Вы не в сети',
  // OFFER_LOADING_ERROR: 'Offers loading failed',
};
