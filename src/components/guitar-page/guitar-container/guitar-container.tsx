import { MouseEvent, useState } from 'react';
import { GuitarPropertyTab, IMG_BASE_PATH, StarRatingOrigin } from '../../../const';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';
import StarRating from '../../layout/star-rating/star-rating';

type GuitarContainerProps = {
  guitar: GuitarType,
  onAddCartClick: (evt: MouseEvent<HTMLAnchorElement>, guitar: GuitarType) => void,
};

function GuitarContainer({guitar, onAddCartClick}: GuitarContainerProps): JSX.Element {

  const {name, previewImg, vendorCode, description, price, stringCount, rating, comments} = guitar;

  const [visibleTab, setVisibleTab] = useState<string>(GuitarPropertyTab.Characteristics);

  const isCharacteristicsVisible = visibleTab === GuitarPropertyTab.Characteristics;
  const isDescriptionVisible = visibleTab === GuitarPropertyTab.Description;

  return (
    <div className="product-container">
      <img className="product-container__img" src={`/${modifyImgUrl(previewImg, IMG_BASE_PATH)}`} width="90" height="235" alt={name} />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <StarRating rating={rating} origin={StarRatingOrigin.Card}/>
          <span className="rate__count">{comments?.length}</span><span className="rate__message"></span>
        </div>
        <div className="tabs">
          <a className={`button${isDescriptionVisible ? ' button--black-border' : ''} button--medium tabs__button`} href="#characteristics" onClick={() => setVisibleTab(GuitarPropertyTab.Characteristics)}>Характеристики</a>
          <a className={`button${isCharacteristicsVisible ? ' button--black-border' : ''} button--medium tabs__button`} href="#description" onClick={() => setVisibleTab(GuitarPropertyTab.Description)}>Описание</a>
          <div className="tabs__content" id="characteristics">
            {
              isCharacteristicsVisible &&
            <table className="tabs__table">
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{vendorCode}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">Электрогитара</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{stringCount} струнная</td>
                </tr>
              </tbody>
            </table>
            }
            {
              isDescriptionVisible &&
            <p className="tabs__product-description" id="description">{description}</p>
            }
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{price.toLocaleString()} ₽</p>
        <a className="button button--red button--big product-container__button" href="/#" onClick={(e) => onAddCartClick(e, guitar)}>Добавить в корзину</a>
      </div>
    </div>
  );
}

export default GuitarContainer;
