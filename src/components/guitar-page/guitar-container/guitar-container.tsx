import { IMG_BASE_PATH } from '../../../const';
import { GuitarType } from '../../../types/guitar-type';
import { modifyImgUrl } from '../../../utils/utils';

type GuitarContainerProps = {
  guitar: GuitarType,
};

function GuitarContainer({guitar}: GuitarContainerProps): JSX.Element {

  const {name, previewImg, vendorCode, description, price, stringCount} = guitar;

  return (
    <div className="product-container">
      <img className="product-container__img" src={`/${modifyImgUrl(previewImg, IMG_BASE_PATH)}`} width="90" height="235" alt={name} />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span className="rate__count"></span><span className="rate__message"></span>
        </div>
        <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
          <div className="tabs__content" id="characteristics">
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
            <p className="tabs__product-description hidden">{description}</p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{price.toLocaleString()} ₽</p><a className="button button--red button--big product-container__button" href="/#">Добавить в корзину</a>
      </div>
    </div>
  );
}

export default GuitarContainer;
