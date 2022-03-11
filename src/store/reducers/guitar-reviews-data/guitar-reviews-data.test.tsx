import { datatype } from 'faker';
import { LoadingStatus } from '../../../const';
import { GuitarReviewsData } from '../../../types/state';
import { getFakeReviews } from '../../../utils/mock';
import { loadGuitarReviews, loadTotalCountReviews, setGuitarReviewsLoadingStatus, setUploadReviewLoadingStatus, updateReviews } from '../../action';
import { guitarReviewsData } from './guitar-reviews-data';

const state: GuitarReviewsData = {
  guitarReviews: [],
  totalCountReviews: 0,
  guitarReviewsLoadingStatus: LoadingStatus.Idle,
  uploadReviewLoadingStatus: LoadingStatus.Idle,
};

const guitarReviews = getFakeReviews();
const newGuitarReviews = getFakeReviews();

describe('Reducer: guitarReviewsData', () => {

  it('with omit parameters should return initial state', () => {
    expect(guitarReviewsData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should load guitar reviews', () => {
    expect(guitarReviewsData(state, loadGuitarReviews(guitarReviews)))
      .toEqual({
        ...state,
        guitarReviews: guitarReviews,
      });
  });

  it('should load total count reviews', () => {
    const fakeTotalCount = datatype.number(30);
    expect(guitarReviewsData(state, loadTotalCountReviews(fakeTotalCount)))
      .toEqual({
        ...state,
        totalCountReviews: fakeTotalCount,
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

  it('should update reviews', () => {
    const oldState = {
      ...state,
      guitarReviews: guitarReviews,
    };

    expect(guitarReviewsData(oldState, updateReviews(newGuitarReviews)))
      .toEqual({
        ...state,
        guitarReviews: newGuitarReviews,
      });
  });

});

