import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { getFakeReview } from '../../../utils/mock';
import ReviewItem from './review-item';

const history = createMemoryHistory();

const fakeReview = getFakeReview();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ReviewItem review={fakeReview}/>
      </Router>,
    );

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
  });

});
