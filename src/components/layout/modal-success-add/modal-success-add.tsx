import { useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

type SuccessAddProps = {
  isVisible: boolean,
  onModalClose: () => void,
}

function ModalSuccessAdd({isVisible, onModalClose}: SuccessAddProps): JSX.Element {

  const handleModalClickClose = (): void => {
    onModalClose();
    document.body.style.overflow = '';
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
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <Link className="button button--small modal__button" to={AppRoute.Cart} onClick={handleModalClickClose}>Перейти в корзину</Link>
              <Link className="button button--black-border button--small modal__button modal__button--right" onClick={handleModalClickClose} to={AppRoute.Main}>Продолжить покупки</Link>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClickClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalSuccessAdd;
