import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../../const';
import { GuitarReviewsData } from '../../../types/state';
import { loadGuitarReviews, setGuitarReviewsLoadingStatus } from '../../action';

const initialState: GuitarReviewsData = {
  guitarReviews: [],
  guitarReviewsLoadingStatus: LoadingStatus.Idle,
};

const guitarReviewsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarReviews, (state, action) => {
      state.guitarReviews = action.payload;
    })
    .addCase(setGuitarReviewsLoadingStatus, (state, action) => {
      state.guitarReviewsLoadingStatus = action.payload;
    });
});

export { guitarReviewsData };
