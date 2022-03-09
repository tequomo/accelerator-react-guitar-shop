import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { getFakeCartItem } from '../../../utils/mock';
import CartItem from './cart-item';

const history = createMemoryHistory();
const cartItem = getFakeCartItem();
const onDeleteClick = jest.fn();

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <CartItem cartItem={cartItem} onDeleteClick={onDeleteClick} />
      </Router>,
    );

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Увеличить количество/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
  });

});
