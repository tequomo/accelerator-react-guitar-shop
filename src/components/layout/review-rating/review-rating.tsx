import { ChangeEvent, Fragment } from 'react';
import { RatingValue } from '../../../const';
import { reviewRatingValues } from '../../../utils/utils';

type ReviewRatingProps = {
  onRatingChange: (e: ChangeEvent<HTMLInputElement>) => void,
  rating: number,
}

function ReviewRating({rating, onRatingChange}: ReviewRatingProps): JSX.Element {
  return (
    <>
      {reviewRatingValues.map((value) =>
        (
          <Fragment key={`star-${value}`}>
            <input className="visually-hidden" type="radio" id={`star-${value}`} data-testid="star" name="rate" value={value} checked={value === rating} onChange={onRatingChange} required></input>
            <label className="rate__label" htmlFor={`star-${value}`} title={RatingValue[value-1]}></label>
          </Fragment>
        ))}
    </>
  );
}

export default ReviewRating;
