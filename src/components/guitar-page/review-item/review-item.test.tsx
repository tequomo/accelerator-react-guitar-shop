import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import ReviewItem from './review-item';

const history = createMemoryHistory();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ReviewItem/>
      </Router>,
    );

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
  });

});
