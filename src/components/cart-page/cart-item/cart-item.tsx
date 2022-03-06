import { GUITARS_TYPES, IMG_BASE_PATH } from '../../../const';
import { CartItemType } from '../../../types/cart-type';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';

type CartItemPropsType = {
  cartItem: CartItemType,
}

function CartItem({cartItem: {item, itemCount}}: CartItemPropsType): JSX.Element {

  const {type, price, previewImg, vendorCode, name, stringCount} = item as GuitarType;

  const guitarType = GUITARS_TYPES.find((guitar) => guitar.type === type)?.name;
  const totalPrice = price * itemCount;

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
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
        <button className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" value={itemCount}/>
        <button className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{totalPrice.toLocaleString()} ₽</div>
    </div>
  );
}

export default CartItem;
