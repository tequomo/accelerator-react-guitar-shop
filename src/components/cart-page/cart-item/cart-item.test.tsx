import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import CartItem from './cart-item';

const history = createMemoryHistory();

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CartItem />
      </Router>,
    );

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Увеличить количество/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

});
