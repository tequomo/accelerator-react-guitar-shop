import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStatus } from '../../../const';
import { fetchFilteredGuitarsAction } from '../../../services/api-actions';
import { getGuitars, getGuitarsLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { debounce } from '../../../utils/utils';

export type ByPriceType = {
  priceMin: string,
  priceMax: string,
}

function CatalogFilter(): JSX.Element {

  const guitars = useSelector(getGuitars);
  const guitarsloadingStatus = useSelector(getGuitarsLoadingStatus);
  const isLoaded = guitarsloadingStatus === LoadingStatus.Succeeded;

  const dispatch = useDispatch();

  const minPriceValue = Math.min(...guitars.map((guitar) => guitar.price));
  const maxPriceValue = Math.max(...guitars.map((guitar) => guitar.price));

  const initPriceParams: ByPriceType = {
    priceMin: '',
    priceMax: '',
  };

  const [filterByPrice, setFilterByPrice] = useState<ByPriceType>(initPriceParams);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterByType, setFilterByType] = useState<string>('');


  const checkMinPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value < minPriceValue || +e.target.value > maxPriceValue) {
      e.target.value = minPriceValue.toString();
    }
  };

  const checkMaxPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value > maxPriceValue || +e.target.value < 0) {
      e.target.value = maxPriceValue.toString();
    }
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterByPrice((state) => ({
      ...state,
      priceMin: e.target.value,
    }));
    if(filterByPrice.priceMax === '') {
      setFilterByPrice((state) => ({
        ...state,
        priceMax: maxPriceValue.toString(),
      }));
    }
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterByPrice((state) => ({
      ...state,
      priceMax: e.target.value,
    }));
    if(filterByPrice.priceMin === '') {
      setFilterByPrice((state) => ({
        ...state,
        priceMin: minPriceValue.toString(),
      }));
    }
  };

  // const fetchFilteredGuitars = useCallback(() => {
  //   dispatch(fetchFilteredGuitarsAction(filterByPrice));
  // }, [dispatch, filterByPrice]);

  // const fetchFilteredGuitars = () => {
  //   dispatch(fetchFilteredGuitarsAction(filterByPrice));
  // };

  useEffect(() => {
    dispatch(fetchFilteredGuitarsAction(filterByPrice));
  }, [dispatch, filterByPrice]);


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={isLoaded ? minPriceValue.toString() : '...'} id="priceMin" name="от" onChange={handleMinPriceChange}  onInput={debounce(checkMinPriceInput, 2000)} value={filterByPrice.priceMin} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={isLoaded ? maxPriceValue.toString() : '...'} id="priceMax" name="до" onChange={handleMaxPriceChange}  onInput={debounce(checkMaxPriceInput, 2000)} value={filterByPrice.priceMax} />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
