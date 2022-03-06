import { LoadingStatus } from '../const';
import { GuitarType } from '../types/guitar-type';
import { ReviewType } from '../types/review-type';
import { State } from '../types/state';
import { datatype } from 'faker';
import { CartItemType } from '../types/cart-type';

const FAKE_ITEMS_COUNT = 6;

export const getFakeReview = ():ReviewType => ({
  id: datatype.string(),
  userName: datatype.string(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  comment: datatype.string(),
  rating: datatype.number(),
  createAt: datatype.string(),
  guitarId: datatype.number(),
});

const fakeReview = getFakeReview();

export const getFakeReviews = (): ReviewType[] => (
  new Array(FAKE_ITEMS_COUNT).fill(null).map(getFakeReview)
);

export const getFakeGuitar = (): GuitarType => ({
  id: datatype.number(),
  name: datatype.string(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  description: datatype.string(),
  previewImg: datatype.string(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
  comments: [fakeReview],
});

const fakeGuitar = getFakeGuitar();

export const getFakeGuitars = (): GuitarType[] => (
  new Array(FAKE_ITEMS_COUNT).fill(null).map(getFakeGuitar)
);

export const getFakeCartItem = (): CartItemType => ({
  item: fakeGuitar,
  itemCount: 2,
});

const fakeCartItem = getFakeCartItem();

export const getFakeStore = (): State => ({
  GUITARS_DATA: {
    guitars: [fakeGuitar],
    guitarsLoadingStatus: LoadingStatus.Succeeded,
    minMaxPriceValues: {
      priceMin: 0,
      priceMax: 0,
    },
    priceValuesLoadingStatus: LoadingStatus.Succeeded,
    searchResult: null,
    searchResultLoadingStatus: LoadingStatus.Succeeded,
  },
  CURRENT_GUITAR_DATA: {
    currentGuitar: fakeGuitar,
    currentGuitarLoadingStatus: LoadingStatus.Succeeded,
  },
  GUITAR_REVIEWS_DATA: {
    guitarReviews: [fakeReview],
    totalCountReviews: 5,
    guitarReviewsLoadingStatus: LoadingStatus.Succeeded,
    uploadReviewLoadingStatus: LoadingStatus.Succeeded,
  },
  CART_DATA: {
    cartItems: [fakeCartItem],
    coupon: '',
    discount: 0,
  },
  STATE: {
    firstLoadState: true,
    totalCountGuitars: 0,
    currentPage: 1,
  },
});
