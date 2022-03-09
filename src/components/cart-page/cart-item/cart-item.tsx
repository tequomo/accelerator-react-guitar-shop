import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GUITARS_TYPES, IMG_BASE_PATH } from '../../../const';
import { addItemToCart, changeCartItemCount, removeItemFromCart } from '../../../store/action';
import { CartItemType } from '../../../types/cart-type';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';

type CartItemPropsType = {
  cartItem: CartItemType,
  onDeleteClick: () => void,
}

function CartItem({cartItem: {item, itemCount}, onDeleteClick}: CartItemPropsType): JSX.Element {

  const {type, price, previewImg, vendorCode, name, stringCount} = item as GuitarType;

  const guitarType = GUITARS_TYPES.find((guitar) => guitar.type === type)?.name;
  const itemsPrice = price * itemCount;

  const [guitarsCount, setGuitarsCount] = useState<number>(0);

  const dispatch = useDispatch();

  const checkAddItemCount = () => {
    if(guitarsCount < 99) {
      setGuitarsCount((state) => state + 1);
      dispatch(addItemToCart(item));
    }
  };

  const checkRemoveItemCount = () => {
    if(guitarsCount > 1) {
      setGuitarsCount((state) => state - 1);
      dispatch(removeItemFromCart(item));
    }
    if(guitarsCount === 1) {
      onDeleteClick();
    }
  };

  const handleChangeCountInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setGuitarsCount(+evt.target.value);
  };

  const handleChangeCartItemCount = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(+evt.target.value === 0) {
      onDeleteClick();
    }
    else {
      dispatch(changeCartItemCount(item.id, +evt.target.value));
    }
  };

  useEffect(() => {
    setGuitarsCount(itemCount);
  }, [itemCount]);

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={onDeleteClick}>
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={`/${modifyImgUrl(previewImg, IMG_BASE_PATH)}`} width="55" height="130" alt={name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{guitarType}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price.toLocaleString()} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={checkRemoveItemCount}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" value={guitarsCount} onChange={handleChangeCountInput} onBlur={handleChangeCartItemCount}/>
        <button className="quantity__button" aria-label="Увеличить количество" onClick={checkAddItemCount}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{itemsPrice.toLocaleString()} ₽</div>
    </div>
  );
}

export default CartItem;
