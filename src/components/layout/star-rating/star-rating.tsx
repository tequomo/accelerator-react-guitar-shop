import { StarRatingSize } from '../../../const';
import { ratingValues } from '../../../utils/utils';

type StarRatingProps = {
  rating: number,
  origin: string,
}

function StarRating({rating, origin}: StarRatingProps): JSX.Element {
  return (
    <>
      {
        ratingValues.map((value) => (
          <svg key={`icon-${value}`} width={StarRatingSize[origin].width} height={StarRatingSize[origin].height} aria-hidden="true" data-testid="star">
            <use xlinkHref={`#icon-${value <= rating ? 'full-' : ''}star`}></use>
          </svg>),
        )
      }
    </>
  );
}

export default StarRating;
