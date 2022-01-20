import { LoadingStatus } from '../const';
import { GuitarType } from '../types/guitar-type';
import { CommentType } from '../types/comment-type';
import { State } from '../types/state';
import { datatype } from 'faker';

const FAKE_ITEMS_COUNT = 6;

export const getFakeComment = ():CommentType => ({
  id: datatype.string(),
  userName: datatype.string(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  comment: datatype.string(),
  rating: datatype.number(),
  createAt: datatype.string(),
  guitarId: datatype.number(),
});

const fakeComment = getFakeComment();

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
  comments: [fakeComment],
});

const fakeGuitar = getFakeGuitar();

export const getFakeGuitars = (): GuitarType[] => (
  new Array(FAKE_ITEMS_COUNT).fill(null).map(getFakeGuitar)
);

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
  STATE: {
    firstLoadState: true,
    totalCountGuitars: 0,
    currentPage: 1,
  },
});
