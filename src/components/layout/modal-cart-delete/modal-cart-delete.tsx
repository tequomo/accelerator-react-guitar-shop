import { useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useDispatch } from 'react-redux';
import { GUITARS_TYPES, IMG_BASE_PATH } from '../../../const';
import { removeGuitarFromCart } from '../../../store/action';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';

type CartDeleteProps = {
  isVisible: boolean,
  deletingGuitar: GuitarType | null,
  onModalClose: () => void,
}

function ModalCartDelete({isVisible, deletingGuitar, onModalClose}: CartDeleteProps): JSX.Element {

  const {type, price, previewImg, vendorCode, name, stringCount} = deletingGuitar as GuitarType;

  const guitarType = GUITARS_TYPES.find((guitar) => guitar.type === type)?.name;

  const dispatch = useDispatch();

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

  const handleDeleteButtonClick = () => {
    dispatch(removeGuitarFromCart(deletingGuitar as GuitarType));
    handleModalClickClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleModalEscClose);
    return () => {
      document.removeEventListener('keydown', handleModalEscClose);
    };
  });

  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active ' : ''}modal-for-ui-kit`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleModalClickClose}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="modal__img" src={`/${modifyImgUrl(previewImg, IMG_BASE_PATH)}`} width="67" height="137" alt={name}></img>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{guitarType}, {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price.toLocaleString()} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--small modal__button" onClick={handleDeleteButtonClick}>Удалить товар</button>
              <button className="button button--black-border button--small modal__button modal__button--right" onClick={handleModalClickClose}>Продолжить покупки</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClickClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalCartDelete;
