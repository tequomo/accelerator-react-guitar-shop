import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactFocusLock from 'react-focus-lock';
import { useDispatch } from 'react-redux';
import { GUITARS_TYPES, IMG_BASE_PATH } from '../../../const';
import { addItemToCart } from '../../../store/action';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';

type AddCartProps = {
  isVisible: boolean,
  activeGuitar: GuitarType | null,
  onModalClose: () => void,
  onSuccess: () => void,
}

function ModalCartAdd({isVisible, activeGuitar, onModalClose, onSuccess}: AddCartProps): JSX.Element {

  const [isAddInCart, setIsAddInCart] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleModalClickClose = useCallback((): void => {
    onModalClose();
    document.body.style.overflow = '';
  }, [onModalClose]);

  const {type, price, previewImg, vendorCode, name, stringCount} = activeGuitar as GuitarType;

  const guitarType = GUITARS_TYPES.find((guitar) => guitar.type === type)?.name;

  const handleModalEscClose = (event: KeyboardEvent) => {
    if(event.key === 'Escape' || event.keyCode === 27) {
      onModalClose();
      document.body.style.overflow = '';
    }
  };

  const handleAddButtonClick = () => {
    dispatch(addItemToCart(activeGuitar as GuitarType));
    setIsAddInCart((state) => !state);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleModalEscClose);
    return () => {
      document.removeEventListener('keydown', handleModalEscClose);
    };
  });

  useEffect(() => {
    if(isAddInCart) {
      handleModalClickClose();
      onSuccess();
      setIsAddInCart((state) => !state);
    }
  }, [handleModalClickClose, isAddInCart, onSuccess]);

  return ReactDOM.createPortal(
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active ' : ''}modal-for-ui-kit`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleModalClickClose}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={`/${modifyImgUrl(previewImg, IMG_BASE_PATH)}`} width="67" height="137" alt={name}>
              </img>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{guitarType}, {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price.toLocaleString()} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add" onClick={handleAddButtonClick}>Добавить в корзину</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClickClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
    , document.body);
}

export default ModalCartAdd;
