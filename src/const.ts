export enum AppRoute {
  Main = '/',
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
