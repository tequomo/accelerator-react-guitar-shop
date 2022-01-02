/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApiRoute, AppRoute, LoadingStatus } from '../../../const';
import { fetchFilteredGuitarsAction, fetchMinMaxPriceValuesAction } from '../../../services/api-actions';
import { getGuitars, getGuitarsLoadingStatus, getMinMaxPriceValues, getPriceValuesLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { debounce } from '../../../utils/utils';

export type FilterType = {
  priceFrom: string,
  priceTo: string,
}

function CatalogFilter(): JSX.Element {

  const minMaxPriceValues = useSelector(getMinMaxPriceValues);
  const priceValuesLoadingStatus = useSelector(getPriceValuesLoadingStatus);
  const isLoaded = priceValuesLoadingStatus === LoadingStatus.Succeeded;

  const dispatch = useDispatch();
  const history = useHistory();

  const initFilterParams: FilterType = {
    priceFrom: '',
    priceTo: '',
  };

  const [filters, setFilters] = useState<FilterType>(initFilterParams);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterByType, setFilterByType] = useState<string>('');

  const [queryString, setQueryString] = useState<string>('');

  const checkMinPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value < minMaxPriceValues.priceMin || +e.target.value > minMaxPriceValues.priceMax) {
      setFilters((state) => ({
        ...state,
        priceFrom: minMaxPriceValues.priceMin.toString(),
      }));
    } else if(filters.priceTo !== '' && e.target.value > filters.priceTo) {
      setFilters((state) => ({
        ...state,
        priceFrom: filters.priceTo,
      }));
    }
  };

  const checkMaxPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value > minMaxPriceValues.priceMax) {
      setFilters((state) => ({
        ...state,
        priceTo: minMaxPriceValues.priceMax.toString(),
      }));
    } else if(filters.priceFrom !== '' && e.target.value < filters.priceFrom) {
      setFilters((state) => ({
        ...state,
        priceTo: filters.priceFrom,
      }));
    } else if(filters.priceFrom === '' && e.target.value < minMaxPriceValues.priceMin.toString()) {
      setFilters((state) => ({
        ...state,
        priceTo: minMaxPriceValues.priceMin.toString(),
      }));
    }
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((state) => ({
      ...state,
      priceFrom: e.target.value,
    }));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((state) => ({
      ...state,
      priceTo: e.target.value,
    }));
  };

  // const fetchFilteredGuitars = useCallback(() => {
  //   dispatch(fetchFilteredGuitarsAction(filters));
  // }, [dispatch, filters]);

  // const fetchFilteredGuitars = () => {
  //   dispatch(fetchFilteredGuitarsAction(filters));
  // };

  // useEffect(() => {
  //   dispatch(fetchFilteredGuitarsAction(filters));
  // }, [dispatch, filters]);

  const composeQueryString = useCallback(() => {
    let query = '';
    if(filters.priceFrom !== '') {
      query += `${query !== '' ? '&' : '?'}price_gte=${filters.priceFrom}`;
    }
    if(filters.priceTo !== '') {
      query += `${query !== '' ? '&' : '?'}price_lte=${filters.priceTo}`;
    }
    setQueryString(query);
  }, [filters.priceFrom, filters.priceTo]);

  useEffect(() => {
    composeQueryString();
    // eslint-disable-next-line no-console
    console.log(filters);
    // history.push(`${ApiRoute.Guitars}${queryString}`);
  },[composeQueryString, filters, history, queryString]);

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
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMin.toString() : '...'} id="priceMin" name="от" onChange={handleMinPriceChange}  onInput={debounce(checkMinPriceInput, 2000)} value={filters.priceFrom} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMax.toString() : '...'} id="priceMax" name="до" onChange={handleMaxPriceChange}  onInput={debounce(checkMaxPriceInput, 2000)} value={filters.priceTo} />
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
