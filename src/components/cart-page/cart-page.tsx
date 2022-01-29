import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../layout/footer/footer';
import Header from '../layout/header/header';
import CartFooter from './cart-footer/cart-footer';

function CartPage(): JSX.Element {
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
            <div className="cart-item">
              <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
              </button>
              <div className="cart-item__image">
                <img src="img/content/guitar-2.jpg" width="55" height="130" alt="ЭлектроГитара Честер bass" />
              </div>
              <div className="product-info cart-item__info">
                <p className="product-info__title">ЭлектроГитара Честер bass</p>
                <p className="product-info__info">Артикул: SO757575</p>
                <p className="product-info__info">Электрогитара, 6 струнная</p>
              </div>
              <div className="cart-item__price">17 500 ₽</div>
              <div className="quantity cart-item__quantity">
                <button className="quantity__button" aria-label="Уменьшить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-minus"></use>
                  </svg>
                </button>
                <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
                <button className="quantity__button" aria-label="Увеличить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div className="cart-item__price-total">17 500 ₽</div>
            </div>
            <div className="cart-item">
              <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
              </button>
              <div className="cart-item__image">
                <img src="img/content/guitar-4.jpg" width="55" height="130" alt="СURT Z30 Plus" />
              </div>
              <div className="product-info cart-item__info">
                <p className="product-info__title">СURT Z30 Plus</p>
                <p className="product-info__info">Артикул: SO754565</p>
                <p className="product-info__info">Электрогитара, 6 струнная</p>
              </div>
              <div className="cart-item__price">34 500 ₽</div>
              <div className="quantity cart-item__quantity">
                <button className="quantity__button" aria-label="Уменьшить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-minus"></use>
                  </svg>
                </button>
                <input className="quantity__input" type="number" placeholder="1" id="4-count" name="4-count" max="99" />
                <button className="quantity__button" aria-label="Увеличить количество">
                  <svg width="8" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-plus"></use>
                  </svg>
                </button>
              </div>
              <div className="cart-item__price-total">34 500 ₽</div>
            </div>
            <CartFooter />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
