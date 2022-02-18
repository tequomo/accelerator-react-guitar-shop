/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGuitarReviewsAction } from '../../../services/api-actions';
import { getGuitarReviews, getGuitarReviewsLoadingStatus } from '../../../store/reducers/guitar-reviews-data/selectors';
import { ReviewType } from '../../../types/review-type';
import ReviewItem from '../review-item/review-item';

type ParamsPropsType = {
  id: string,
}

function ReviewsList(): JSX.Element {

  const { id } = useParams<ParamsPropsType>();

  const guitarReviews = useSelector(getGuitarReviews);
  const guitarReviewsLoadingStatus = useSelector(getGuitarReviewsLoadingStatus);

  const dispatch = useDispatch();

  const fetchGuitarReviews = useCallback(() => {
    dispatch(fetchGuitarReviewsAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchGuitarReviews();
  }, [fetchGuitarReviews]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="/#">Оставить отзыв</a>
      {
        guitarReviews.length ?
          guitarReviews.map((review: ReviewType) => <ReviewItem key={review.id} review={review}/>) :
          <div>Отзывы отсутствуют, будьте первыми ;-).</div>
      }
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

export default ReviewsList;
