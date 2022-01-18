import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import CartFooter from './cart-footer';

const history = createMemoryHistory();

describe('Component: CartFooter', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CartFooter />
      </Router>,
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

});
