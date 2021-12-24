import { ratingValues } from '../../../utils/utils';

type StarRatingProps = {
  rating: number,
}

function StarRating({rating}: StarRatingProps): JSX.Element {
  return (
    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
      {
        ratingValues.map((value) => (
          <svg key={`icon-${value}`} width="12" height="11" aria-hidden="true">
            <use xlinkHref={`#icon-${value <= rating ? 'full-' : ''}star`}></use>
          </svg>),
        )
      }
      <span className="rate__count">9</span><span className="rate__message"></span>
    </div>
  );
}

export default StarRating;
