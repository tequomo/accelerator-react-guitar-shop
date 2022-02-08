export enum AppRoute {
  Main = '/',
  GuitarQuery = '/guitars',
  Guitar = '/guitars/',
  GuitarRoom = '/guitars/:id',
  Cart = '/cart',
  CatalogPage = '/page_:pageNumber',
}

export enum ApiRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum HttpCode {
  Ok = 200,
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

export const EMBED_COMMENTS_KEY = '_embed=comments';
export const PRICE_INTERVAL_QUERY = '?_sort=price&_order=asc';

export const PriceQueryKey: {[key: string]: string} = {
  PriceFrom: 'price_gte',
  PriceTo: 'price_lte',
};

export const GUITARS_TYPES = [
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

export const UrlFilterParams = {
  PriceFrom:  'price_gte',
  PriceTo: 'price_lte',
  Type: 'type',
  StringCount: 'stringCount',
};

export const UrlSortParams = {
  Type: '_sort',
  Order: '_order',
};

export enum UrlPaginationParams {
  Start = '_start',
  End = '_end',
}

export const Messages = {
  LOAD_FAIL: 'Загрузка данных не удалась. Возможно, Вы не в сети',
};

export enum GuitarPropertyTab {
  Characteristics = 'characteristics',
  Description = 'description',
}

