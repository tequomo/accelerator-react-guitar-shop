import { toast } from 'react-toastify';
import { ApiRoute, EMBED_COMMENTS_KEY, LoadingStatus, Messages, PRICE_INTERVAL_QUERY } from '../const';
import {
  doSearchRequest,
  loadMinMaxPriceValues,
  loadCurrentGuitar,
  loadGuitars,
  loadTotalCountGuitars,
  setCurrentGuitarLoadingStatus,
  setGuitarsLoadingStatus,
  setPriceValuesLoadingStatus,
  setSearchResultLoadingStatus,
  loadGuitarReviews,
  setGuitarReviewsLoadingStatus,
  loadTotalCountReviews,
  setUploadReviewLoadingStatus,
  loadDiscount,
  setDiscountLoadingStatus,
  loadCoupon
} from '../store/action';
import { ThunkActionResult } from '../types/action';
import { ReviewPostType, ReviewType } from '../types/review-type';
import { GuitarType } from '../types/guitar-type';
import { CouponPostType } from '../types/cart-type';

const TOTAL_COUNT_HEADER = 'x-total-count';
const DATA_LIMIT_KEY = '_limit=';
const DATA_SORT_KEY = '&_sort=createAt&_order=desc';

export const fetchGuitarsAction = (queryString=''): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Loading));
      const { data, headers } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}${queryString}${queryString ? '&' : '?'}${EMBED_COMMENTS_KEY}`);
      dispatch(loadTotalCountGuitars( +headers[TOTAL_COUNT_HEADER] || data.length));
      dispatch(loadGuitars(data));
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarsLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
    }
  };

export const fetchMinMaxPriceValuesAction = (queryString: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}${PRICE_INTERVAL_QUERY}&${queryString}`);
      dispatch(loadMinMaxPriceValues({
        priceMin: data[0].price,
        priceMax: data[data.length-1].price,
      }));
      dispatch(setPriceValuesLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setPriceValuesLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
    }
  };

export const fetchCurrentGuitarAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType>(`${ApiRoute.Guitars}/${id}?${EMBED_COMMENTS_KEY}`);
      dispatch(loadCurrentGuitar(data));
      dispatch(setCurrentGuitarLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setCurrentGuitarLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
    }
  };

export const fetchGuitarReviewsAction = (guitarId: string, reviewsCount: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data, headers } = await api.get<ReviewType[]>(`${ApiRoute.Guitars}/${guitarId}${ApiRoute.Comments}?${DATA_LIMIT_KEY}${reviewsCount}${DATA_SORT_KEY}`);
      dispatch(loadTotalCountReviews( +headers[TOTAL_COUNT_HEADER] || data.length));
      dispatch(loadGuitarReviews(data));
      dispatch(setGuitarReviewsLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setGuitarReviewsLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
    }
  };

export const postGuitarReviewAction = (review: ReviewPostType): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      // dispatch(setUploadReviewLoadingStatus(LoadingStatus.Loading));
      const { data } = await api.post<ReviewType>(ApiRoute.Comments, review);

      const showedReviews = getState().GUITAR_REVIEWS_DATA.guitarReviews;
      const updatedReviews = [data, ...showedReviews.slice(0, showedReviews.length - 1)];
      const updatedTotalCountReviews = getState().GUITAR_REVIEWS_DATA.totalCountReviews + 1;
      dispatch(loadGuitarReviews(updatedReviews));
      dispatch(loadTotalCountReviews(updatedTotalCountReviews));
      dispatch(setUploadReviewLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setUploadReviewLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
    }
  };


export const fetchSearchGuitarAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setSearchResultLoadingStatus(LoadingStatus.Loading));
      if(!query) {
        dispatch(doSearchRequest(null));
      } else {
        const { data } = await api.get<GuitarType[]>(`${ApiRoute.Guitars}?name_like=${query}`);
        dispatch(doSearchRequest(data));
      }
      dispatch(setSearchResultLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setSearchResultLoadingStatus(LoadingStatus.Failed));
      toast.error(Messages.LOAD_FAIL);
    }
  };

export const postCouponAction = (coupon: CouponPostType): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    try {
      dispatch(setDiscountLoadingStatus(LoadingStatus.Loading));
      const { data } = await api.post<number>(ApiRoute.Coupons, coupon);
      dispatch(loadDiscount(data));
      dispatch(loadCoupon(coupon.coupon as string));
      dispatch(setDiscountLoadingStatus(LoadingStatus.Succeeded));
    } catch {
      dispatch(setDiscountLoadingStatus(LoadingStatus.Failed));
      // toast.error(Messages.LOAD_FAIL);
    }
  };
