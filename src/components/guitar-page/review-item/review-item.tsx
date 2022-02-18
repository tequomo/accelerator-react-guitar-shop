import { StarRatingOrigin } from '../../../const';
import { ReviewType } from '../../../types/review-type';
import { localizeDate } from '../../../utils/utils';
import StarRating from '../../layout/star-rating/star-rating';

type ReviewItemProps = {
  review: ReviewType,
}

function ReviewItem({review:{userName, createAt, advantage, disadvantage, comment, rating}}: ReviewItemProps): JSX.Element {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{localizeDate(createAt)}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <StarRating rating={rating} origin={StarRatingOrigin.Review}/>
        <span className="rate__count"></span><span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}</p>
    </div>
  );
}

export default ReviewItem;
