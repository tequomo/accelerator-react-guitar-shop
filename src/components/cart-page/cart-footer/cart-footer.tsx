import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CouponMessage, LoadingStatus } from '../../../const';
import { postCouponAction } from '../../../services/api-actions';
import { setDiscountLoadingStatus } from '../../../store/action';
import { getCoupon, getDiscount, getDiscountLoadingStatus } from '../../../store/reducers/cart-data/selectors';
import { hasBlankSpaces, removeSpaces } from '../../../utils/utils';

type CartFooterProps = {
  totalPrice: number,
}

function CartFooter({totalPrice}: CartFooterProps): JSX.Element {

  const addedCoupon = useSelector(getCoupon);
  const discountPrice = (useSelector(getDiscount) / 100) * totalPrice;
  const discountLoadingStatus = useSelector(getDiscountLoadingStatus);
  const priceWithDiscount = totalPrice - discountPrice;

  const isDidAction = discountLoadingStatus !== LoadingStatus.Idle;
  const isCouponAccepted = discountLoadingStatus === LoadingStatus.Succeeded;

  const [couponInput, setCouponInput] = useState<string>('');
  const [couponMessage, setCouponMessage] = useState<CouponMessage>(CouponMessage.Default);

  const dispatch = useDispatch();

  const handleCouponInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const coupon = hasBlankSpaces(evt.target.value) ? removeSpaces(evt.target.value) : evt.target.value;
    setCouponInput(coupon);
    if(isDidAction && couponMessage !== CouponMessage.Default) {
      dispatch(setDiscountLoadingStatus(LoadingStatus.Idle));
      setCouponMessage(CouponMessage.Default);
    }
  };

  const handlePostCoupon = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCouponAction({coupon: couponInput}));
  };

  useEffect(() => {
    if(discountLoadingStatus === LoadingStatus.Succeeded) {
      setCouponMessage(CouponMessage.Accept);
    }
    if(discountLoadingStatus === LoadingStatus.Failed) {
      setCouponMessage(CouponMessage.Decline);
    }
  }, [discountLoadingStatus, dispatch]);

  useEffect(() => {
    if(addedCoupon !== null) {
      setCouponInput(addedCoupon);
    }
  }, [addedCoupon]);

  return (
    <div className="cart__footer">
      <div className="cart__coupon coupon">
        <h2 className="title title--little coupon__title">Промокод на скидку</h2>
        <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
        <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handlePostCoupon}>
          <div className="form-input coupon__input">
            <label className="visually-hidden">Промокод</label>
            <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" onChange={handleCouponInput} value={couponInput} disabled={isCouponAccepted}/>
            {
              couponMessage !== CouponMessage.Default &&
              <p className={`form-input__message form-input__message${couponMessage === CouponMessage.Accept ? '--success' : '--error'}`}>{couponMessage}</p>
            }
          </div>
          <button className="button button--big coupon__button" disabled={isCouponAccepted}>Применить</button>
        </form>
      </div>
      <div className="cart__total-info">
        <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice.toLocaleString()} ₽</span></p>
        <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value${discountPrice !== 0 ? ' cart__total-value--bonus' : ''}`}>- {discountPrice.toLocaleString()} ₽</span></p>
        <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{priceWithDiscount.toLocaleString()} ₽</span></p>
        <button className="button button--red button--big cart__order-button">Оформить заказ</button>
      </div>
    </div>
  );
}

export default CartFooter;
