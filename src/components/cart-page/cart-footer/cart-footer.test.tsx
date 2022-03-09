import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import CartFooter from './cart-footer';

const history = createMemoryHistory();
const fakeTotalPrice = datatype.number();

describe('Component: CartFooter', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CartFooter totalPrice={fakeTotalPrice} />
      </Router>,
    );

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

});
