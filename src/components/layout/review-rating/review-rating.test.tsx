import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import ReviewRating from './review-rating';

const history = createMemoryHistory();
const rating = datatype.number();
const onRatingChange = jest.fn();

describe('Component: ReviewRating', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ReviewRating rating={rating} onRatingChange={onRatingChange}/>
      </Router>,
    );

    expect(screen.getAllByTestId('star')[0]).toBeInTheDocument();
  });

  it('should call callback when user click on close button', () => {
    render(
      <Router history={history}>
        <ReviewRating rating={rating} onRatingChange={onRatingChange}/>
      </Router>,
    );

    userEvent.click(screen.getByTitle('Хорошо'));
    expect(onRatingChange).toBeCalledTimes(1);
  });

});
