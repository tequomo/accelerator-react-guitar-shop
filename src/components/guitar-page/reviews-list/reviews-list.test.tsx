import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import ReviewsList from './reviews-list';

const history = createMemoryHistory();
const onAddReviewClick = jest.fn();

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ReviewsList onAddReviewClick={onAddReviewClick}/>
      </Router>,
    );

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Отзывы');
    expect(screen.getAllByText(/Рейтинг:/i)[0]).toBeInTheDocument();
  });

});
