import { useCallback, useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadingStatus } from '../../../const';
import { fetchGuitarReviewsAction } from '../../../services/api-actions';
import { getGuitarReviews, getGuitarReviewsLoadingStatus, getTotalCountReviews } from '../../../store/reducers/guitar-reviews-data/selectors';
import { ReviewType } from '../../../types/review-type';
import { debounce } from '../../../utils/utils';
import LoaderWrapper from '../../layout/loader-wrapper/loader-wrapper';
import ReviewItem from '../review-item/review-item';

type ParamsPropsType = {
  id: string,
}

type ReviewListProps = {
  onAddReviewClick: (evt: MouseEvent<HTMLAnchorElement>) => void,
};

const INIT_REVIEWS_COUNT = 3;

function ReviewsList({onAddReviewClick}: ReviewListProps): JSX.Element {

  const [showedReviewsCount, setShowedReviewsCount] = useState<number>(INIT_REVIEWS_COUNT);

  const { id } = useParams<ParamsPropsType>();

  const totalCountReviews = useSelector(getTotalCountReviews);
  const guitarReviews = useSelector(getGuitarReviews);
  const guitarReviewsLoadingStatus = useSelector(getGuitarReviewsLoadingStatus);

  const dispatch = useDispatch();

  const fetchGuitarReviews = useCallback(() => {
    dispatch(fetchGuitarReviewsAction(id, showedReviewsCount));
  }, [dispatch, id, showedReviewsCount]);

  useEffect(() => {
    fetchGuitarReviews();
  }, [fetchGuitarReviews]);

  const handleShowReviewsButtonClick = useCallback(() => {
    const updatedReviewsCount = showedReviewsCount < totalCountReviews ? showedReviewsCount + INIT_REVIEWS_COUNT : totalCountReviews;
    setShowedReviewsCount(updatedReviewsCount);
  }, [showedReviewsCount, totalCountReviews]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="/#" onClick={onAddReviewClick}>Оставить отзыв</a>
      <LoaderWrapper isLoad={guitarReviewsLoadingStatus === LoadingStatus.Succeeded}>
        <>
          {
            guitarReviews.length ?
              guitarReviews.map((review: ReviewType) => <ReviewItem key={review.id} review={review}/>) :
              <div>Отзывы отсутствуют, будьте первыми ;-).</div>
          }
          {
            guitarReviews.length !== totalCountReviews && <button className="button button--medium reviews__more-button" onClick={debounce(handleShowReviewsButtonClick, 300)}>Показать еще отзывы</button>
          }
          <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
        </>
      </LoaderWrapper>
    </section>
  );
}

export default ReviewsList;
