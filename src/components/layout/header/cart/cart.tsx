import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { getItemsInCart } from '../../../../store/reducers/cart-data/selectors';

function Cart(): JSX.Element {

  const cartItems = useSelector(getItemsInCart);

  const totalItemsCount = cartItems.reduce((total, cartItem) => total + cartItem.itemCount, 0);


  return (
    <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>
      {
        totalItemsCount !== 0 && <span className="header__cart-count">{totalItemsCount}</span>
      }
    </Link>
  );
}

export default Cart;
