import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { GuitarReviewsData } from '../../../types/state';
import { loadGuitarReviews, loadTotalCountReviews, setGuitarReviewsLoadingStatus, setUploadReviewLoadingStatus, updateReviews } from '../../action';

const initialState: GuitarReviewsData = {
  guitarReviews: [],
  totalCountReviews: 0,
  guitarReviewsLoadingStatus: LoadingStatus.Idle,
  uploadReviewLoadingStatus: LoadingStatus.Idle,
};

const guitarReviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarReviews, (state, action) => {
      state.guitarReviews = action.payload;
    })
    .addCase(loadTotalCountReviews, (state, action) => {
      state.totalCountReviews = action.payload;
    })
    .addCase(setGuitarReviewsLoadingStatus, (state, action) => {
      state.guitarReviewsLoadingStatus = action.payload;
    })
    .addCase(setUploadReviewLoadingStatus, (state, action) => {
      state.uploadReviewLoadingStatus = action.payload;
    })
    .addCase(updateReviews, (state, action) => {
      state.guitarReviews = action.payload;
    });
});

export { guitarReviewsData };
