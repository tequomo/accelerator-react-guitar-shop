import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, IMG_BASE_PATH } from '../../../const';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';
import StarRating from '../star-rating/star-rating';


type GuitarCardProps = {
  guitar: GuitarType,
  onAddCartClick: (evt: MouseEvent<HTMLAnchorElement>, guitar: GuitarType) => void,
}

function GuitarCard({guitar, onAddCartClick}: GuitarCardProps): JSX.Element {

  const {id, name, price, previewImg, rating, comments} = guitar;

  return (
    <div className="product-card"><img src={`/${modifyImgUrl(previewImg, IMG_BASE_PATH)}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <StarRating rating={rating}/>
          <span className="rate__count">{comments?.length}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Guitar}${id}`}>Подробнее</Link>
        <a className="button button--red button--mini button--add-to-cart" href="/#" onClick={(e) => onAddCartClick(e, guitar)}>Купить</a>
      </div>
    </div>
  );
}

export default GuitarCard;
