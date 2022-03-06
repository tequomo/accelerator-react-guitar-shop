import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getItemsInCart } from '../../store/reducers/cart-data/selectors';
import Footer from '../layout/footer/footer';
import Header from '../layout/header/header';
import CartFooter from './cart-footer/cart-footer';
import CartItem from './cart-item/cart-item';

function CartPage(): JSX.Element {

  const cartItems = useSelector(getItemsInCart);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={AppRoute.Cart} className="link">Корзина</Link>
            </li>
          </ul>
          <div className="cart">
            {
              cartItems.length &&
              cartItems.map((cartItem) => <CartItem key={cartItem.item.vendorCode} cartItem={cartItem} />)
            }
            <CartFooter />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
