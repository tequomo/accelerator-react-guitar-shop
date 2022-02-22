import { LoadingStatus } from '../../../const';
import { GuitarReviewsData } from '../../../types/state';
import { getFakeReviews } from '../../../utils/mock';
import { loadGuitarReviews, setGuitarReviewsLoadingStatus, setUploadReviewLoadingStatus } from '../../action';
import { guitarReviewsData } from './guitar-reviews-data';

const state: GuitarReviewsData = {
  guitarReviews: [],
  totalCountReviews: 0,
  guitarReviewsLoadingStatus: LoadingStatus.Idle,
  uploadReviewLoadingStatus: LoadingStatus.Idle,
};

const guitarReviews = getFakeReviews();

describe('Reducer: guitarReviewsData', () => {

  it('with omit parameters should return initial state', () => {
    expect(guitarReviewsData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should load reviews', () => {
    expect(guitarReviewsData(state, loadGuitarReviews(guitarReviews)))
      .toEqual({
        ...state,
        guitarReviews: guitarReviews,
      });
  });

  it('should update loading status when reviews are loaded or not loaded', () => {
    expect(guitarReviewsData(state, setGuitarReviewsLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        guitarReviewsLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(guitarReviewsData(state, setGuitarReviewsLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        guitarReviewsLoadingStatus: LoadingStatus.Failed,
      });
  });

  it('should update loading status when upload review are loaded or not loaded', () => {
    expect(guitarReviewsData(state, setUploadReviewLoadingStatus(LoadingStatus.Succeeded)))
      .toEqual({
        ...state,
        uploadReviewLoadingStatus: LoadingStatus.Succeeded,
      });
    expect(guitarReviewsData(state, setUploadReviewLoadingStatus(LoadingStatus.Failed)))
      .toEqual({
        ...state,
        uploadReviewLoadingStatus: LoadingStatus.Failed,
      });
  });

});

