import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';

function Cart(): JSX.Element {
  return (
    <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
    </Link>
  );
}

export default Cart;
