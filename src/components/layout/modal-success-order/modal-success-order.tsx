import { useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { clearCart } from '../../../store/action';

type SuccessOrderProps = {
  isVisible: boolean,
  onModalClose: () => void,
  orderCost: number,
}

function ModalSuccessOrder({isVisible, onModalClose, orderCost}: SuccessOrderProps): JSX.Element {

  const dispatch = useDispatch();

  const handleModalClickClose = (): void => {
    onModalClose();
    document.body.style.overflow = '';
    dispatch(clearCart());
  };

  const handleModalEscClose = (event: KeyboardEvent) => {
    if(event.key === 'Escape' || event.keyCode === 27) {
      onModalClose();
      document.body.style.overflow = '';
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleModalEscClose);
    return () => {
      document.removeEventListener('keydown', handleModalEscClose);
    };
  });

  useEffect(() => {
    if(isVisible) {
      document.body.style.overflow = 'hidden';
    }
  }, [isVisible]);

  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active ' : ''}modal--success modal-for-ui-kit"`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleModalClickClose}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Ваш заказ на сумму <br />
              <span className="cart__total-value cart__total-value--payment cart__total-value--bonus">{orderCost.toLocaleString()} ₽</span> <br /> успешно оформлен
            </p>
            <div className="modal__button-container modal__button-container--add">
              <Link className="button button--big modal__button modal__button--review" to={AppRoute.Main} onClick={handleModalClickClose}>Вернуться к покупкам</Link>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClickClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalSuccessOrder;
