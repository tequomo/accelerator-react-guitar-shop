import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Navigation from './navigation';

const history = createMemoryHistory();

describe('Component: Navigation', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Navigation />
      </Router>,
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

});
