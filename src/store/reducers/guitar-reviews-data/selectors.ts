import { LoadingStatus } from '../../../const';
import { ReviewType } from '../../../types/review-type';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getGuitarReviews = (state: State): ReviewType[] | [] => state[NameSpace.guitarReviews].guitarReviews;
export const getTotalCountReviews = (state: State): number => state[NameSpace.guitarReviews].totalCountReviews;
export const getGuitarReviewsLoadingStatus = (state: State): LoadingStatus => state[NameSpace.guitarReviews].guitarReviewsLoadingStatus;
export const getUploadReviewLoadingStatus = (state: State): LoadingStatus => state[NameSpace.guitarReviews].uploadReviewLoadingStatus;
