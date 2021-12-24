import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CARDS_PER_PAGE } from '../../../const';
import { fetchGuitarsAction } from '../../../services/api-actions';
import { getGuitars } from '../../../store/reducers/guitars-data/selectors';
import { GuitarType } from '../../../types/guitar-type';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import GuitarCard from '../guitar-card/guitar-card';
import Pagination from '../pagination/pagination';


function Catalog(): JSX.Element {

  const guitars = useSelector(getGuitars).slice(0, CARDS_PER_PAGE);

  const dispatch = useDispatch();

  const fetchGuitars = useCallback(() => {
    dispatch(fetchGuitarsAction());
  }, [dispatch]);

  useEffect(() => {
    fetchGuitars();
  }, [fetchGuitars]);

  return (
    <div className="catalog">
      <CatalogFilter />
      <CatalogSort />
      <div className="cards catalog__cards">
        {
          guitars.map((guitar: GuitarType) => <GuitarCard key={guitar.vendorCode} guitar={guitar}/>)
        }

        {/* <div className="product-card"><img src="img/content/guitar-2.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">9</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">СURT Z30 Plus Acoustics</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-1.jpg" width="75" height="190" alt="Честер Bass" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">9</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">Честер Bass</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>51 100 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red-border button--mini button--in-cart" href="/#">В Корзине</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-2.jpg" width="75" height="190" alt="СURT Z30 Plus" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">76</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">СURT Z30 Plus</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-3.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">9</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">СURT Z30 Plus Acoustics</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-4.jpg" width="75" height="190" alt="СURT Z30 Plus" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">76</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">СURT Z30 Plus</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-5.jpg" width="75" height="190" alt="Честер Bass" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">9</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">Честер Bass</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>51 100 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red-border button--mini button--in-cart" href="/#">В Корзине</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-6.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">9</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">СURT Z30 Plus Acoustics</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-7.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">9</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">СURT Z30 Plus Acoustics</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
          </div>
        </div>
        <div className="product-card"><img src="img/content/guitar-8.jpg" width="75" height="190" alt="СURT Z30 Plus" />
          <div className="product-card__info">
            <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="rate__count">76</span><span className="rate__message"></span>
            </div>
            <p className="product-card__title">СURT Z30 Plus</p>
            <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
            </p>
          </div>
          <div className="product-card__buttons">
            <a className="button button--mini" href="/#">Подробнее</a>
            <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
          </div>
        </div> */}
      </div>
      <Pagination />
    </div>
  );
}

export default Catalog;
