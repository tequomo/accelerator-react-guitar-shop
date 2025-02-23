import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, LoadingStatus } from '../../const';
import { loadCoupon, loadDiscount, setDiscountLoadingStatus } from '../../store/action';
import { getDiscount, getItemsInCart } from '../../store/reducers/cart-data/selectors';
import { GuitarType } from '../../types/guitar-type';
import Footer from '../layout/footer/footer';
import Header from '../layout/header/header';
import ModalCartDelete from '../layout/modal-cart-delete/modal-cart-delete';
import ModalSuccessOrder from '../layout/modal-success-order/modal-success-order';
import CartFooter from './cart-footer/cart-footer';
import CartItem from './cart-item/cart-item';

function CartPage(): JSX.Element {

  const [modalCartDeleteVisible, setModalCartDeleteVisible] = useState<boolean>(false);
  const [deletingGuitar, setDeletingGuitar] = useState<GuitarType | null>(null);
  const [modalSuccessOrderVisible, setModalSuccessOrderVisible] = useState<boolean>(false);
  const [orderCost, setOrderCost] = useState<number>(0);

  const dispatch = useDispatch();

  const cartItems = useSelector(getItemsInCart);
  const discount = useSelector(getDiscount);

  const totalPrice = cartItems.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.itemCount), 0);

  const handleSetDeletingGuitar = (item: GuitarType): void => {
    setDeletingGuitar(item);
    setModalCartDeleteVisible((state) => !state);
    document.body.style.overflow = 'hidden';
  };

  const handleOrderSuccess = useCallback((total: number) => {
    setOrderCost(total);
    setModalSuccessOrderVisible((state) => !state);
  }, []);

  useEffect(() => {
    if(cartItems.length === 0 && discount !== 0) {
      dispatch(loadDiscount(0));
      dispatch(loadCoupon(''));
      dispatch(setDiscountLoadingStatus(LoadingStatus.Idle));
    }
  }, [cartItems.length, discount, dispatch]);

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
              cartItems.length !== 0 ?
                cartItems.map((cartItem) => <CartItem key={cartItem.item.vendorCode} cartItem={cartItem} onDeleteClick={() => handleSetDeletingGuitar(cartItem.item)}/>) :
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '25vh', fontSize: '20px'}}>
                  Ваша корзина пуста
                </div>
            }
            {
              cartItems.length !== 0 && <CartFooter totalPrice={totalPrice} onOrderSuccess={handleOrderSuccess}/>
            }
          </div>
          {modalCartDeleteVisible && <ModalCartDelete isVisible={modalCartDeleteVisible} onModalClose={() => setModalCartDeleteVisible(false)} deletingGuitar={deletingGuitar}/>}
          {modalSuccessOrderVisible && <ModalSuccessOrder isVisible={modalSuccessOrderVisible} onModalClose={() => setModalSuccessOrderVisible(false)} orderCost={orderCost}/>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
