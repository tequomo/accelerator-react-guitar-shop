import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, IMG_BASE_PATH, StarRatingOrigin } from '../../../const';
import { getItemsInCart } from '../../../store/reducers/cart-data/selectors';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';
import StarRating from '../star-rating/star-rating';


type GuitarCardProps = {
  guitar: GuitarType,
  onAddCartClick: (evt: MouseEvent<HTMLAnchorElement>, guitar: GuitarType) => void,
}

function GuitarCard({guitar, onAddCartClick}: GuitarCardProps): JSX.Element {

  const {id, name, price, previewImg, rating, comments} = guitar;

  const cartItems = useSelector(getItemsInCart);
  const isGuitarInCart = cartItems.find((cartItem) => cartItem.item.id === guitar.id) !== undefined;

  return (
    <div className="product-card"><img src={`/${modifyImgUrl(previewImg, IMG_BASE_PATH)}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <StarRating rating={rating} origin={StarRatingOrigin.Card}/>
          <span className="rate__count">{comments?.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Guitar}${id}`}>Подробнее</Link>
        {
          isGuitarInCart ? <Link className="button button--red-border button--mini button--in-cart" to={AppRoute.Cart}>В Корзине</Link> :
            <a className="button button--red button--mini button--add-to-cart" href="/#" onClick={(e) => onAddCartClick(e, guitar)}>Купить</a>
        }
      </div>
    </div>
  );
}

export default GuitarCard;
