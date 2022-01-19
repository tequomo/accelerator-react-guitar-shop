import { ratingValues } from '../../../utils/utils';

type StarRatingProps = {
  rating: number,
}

function StarRating({rating}: StarRatingProps): JSX.Element {
  return (
    <>
      {
        ratingValues.map((value) => (
          <svg key={`icon-${value}`} width="12" height="11" aria-hidden="true" data-testid="star">
            <use xlinkHref={`#icon-${value <= rating ? 'full-' : ''}star`}></use>
          </svg>),
        )
      }
    </>
  );
}

export default StarRating;
