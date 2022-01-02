/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApiRoute, AppRoute, LoadingStatus } from '../../../const';
import { fetchFilteredGuitarsAction, fetchMinMaxPriceValuesAction } from '../../../services/api-actions';
import { getGuitars, getGuitarsLoadingStatus, getMinMaxPriceValues, getPriceValuesLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { debounce } from '../../../utils/utils';

export type ByPriceType = {
  priceFrom: string,
  priceTo: string,
}

function CatalogFilter(): JSX.Element {

  const minMaxPriceValues = useSelector(getMinMaxPriceValues);
  const priceValuesLoadingStatus = useSelector(getPriceValuesLoadingStatus);
  const isLoaded = priceValuesLoadingStatus === LoadingStatus.Succeeded;

  const dispatch = useDispatch();
  const history = useHistory();

  const initPriceParams: ByPriceType = {
    priceFrom: '',
    priceTo: '',
  };

  const [filterByPrice, setFilterByPrice] = useState<ByPriceType>(initPriceParams);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterByType, setFilterByType] = useState<string>('');

  const [queryString, setQueryString] = useState<string>('');

  const checkMinPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value < minMaxPriceValues.priceMin || +e.target.value > minMaxPriceValues.priceMax) {
      setFilterByPrice((state) => ({
        ...state,
        priceFrom: minMaxPriceValues.priceMin.toString(),
      }));
    } else if(filterByPrice.priceTo !== '' && e.target.value > filterByPrice.priceTo) {
      setFilterByPrice((state) => ({
        ...state,
        priceFrom: filterByPrice.priceTo,
      }));
    }
  };

  const checkMaxPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value > minMaxPriceValues.priceMax) {
      setFilterByPrice((state) => ({
        ...state,
        priceTo: minMaxPriceValues.priceMax.toString(),
      }));
    } else if(filterByPrice.priceFrom !== '' && e.target.value < filterByPrice.priceFrom) {
      setFilterByPrice((state) => ({
        ...state,
        priceTo: filterByPrice.priceFrom,
      }));
    } else if(filterByPrice.priceFrom === '' && e.target.value < minMaxPriceValues.priceMin.toString()) {
      setFilterByPrice((state) => ({
        ...state,
        priceMax: minMaxPriceValues.priceMin.toString(),
      }));
    }
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterByPrice((state) => ({
      ...state,
      priceMin: e.target.value,
    }));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterByPrice((state) => ({
      ...state,
      priceMax: e.target.value,
    }));
  };

  // const fetchFilteredGuitars = useCallback(() => {
  //   dispatch(fetchFilteredGuitarsAction(filterByPrice));
  // }, [dispatch, filterByPrice]);

  // const fetchFilteredGuitars = () => {
  //   dispatch(fetchFilteredGuitarsAction(filterByPrice));
  // };

  // useEffect(() => {
  //   dispatch(fetchFilteredGuitarsAction(filterByPrice));
  // }, [dispatch, filterByPrice]);

  const composeQueryString = useCallback(() => {
    let query = '';
    if(filterByPrice.priceFrom !== '') {
      query += `${query !== '' ? '&' : '?'}price_gte=${filterByPrice.priceFrom}`;
    }
    if(filterByPrice.priceTo !== '') {
      query += `${query !== '' ? '&' : '?'}price_lte=${filterByPrice.priceTo}`;
    }
    setQueryString(query);
  }, [filterByPrice.priceFrom, filterByPrice.priceTo]);

  useEffect(() => {
    composeQueryString();
    // eslint-disable-next-line no-console
    console.log(queryString);
    // history.push(`${ApiRoute.Guitars}${queryString}`);
  },[composeQueryString, history, queryString]);

  useEffect(() => {
    dispatch(fetchMinMaxPriceValuesAction());
  }, [dispatch]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMin.toString() : '...'} id="priceMin" name="от" onChange={handleMinPriceChange}  onInput={debounce(checkMinPriceInput, 2000)} value={filterByPrice.priceFrom} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMax.toString() : '...'} id="priceMax" name="до" onChange={handleMaxPriceChange}  onInput={debounce(checkMaxPriceInput, 2000)} value={filterByPrice.priceTo} />
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
