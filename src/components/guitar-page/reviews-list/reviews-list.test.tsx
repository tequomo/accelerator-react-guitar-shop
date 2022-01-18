import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import ReviewsList from './reviews-list';

const history = createMemoryHistory();

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ReviewsList/>
      </Router>,
    );

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Отзывы');
    expect(screen.getAllByText(/Рейтинг:/i)[0]).toBeInTheDocument();
  });

});
