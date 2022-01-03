import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, guitarsByType, GuitarTypeName, LoadingStatus, priceQueryKey } from '../../../const';
import { fetchMinMaxPriceValuesAction } from '../../../services/api-actions';
import { getMinMaxPriceValues, getPriceValuesLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { capitalizeWord, debounce } from '../../../utils/utils';

export type FilterType = {
  priceFrom: string,
  priceTo: string,
  type: string[],
  stringCount: number[],
}

const guitarsByStringCount = [4, 6, 7, 12];
const initStringCountState: boolean[] = new Array(guitarsByStringCount.length).fill(false);
const initTypeCheckedState: boolean[] = new Array(guitarsByType.length).fill(false);

function CatalogFilter(): JSX.Element {

  const minMaxPriceValues = useSelector(getMinMaxPriceValues);
  const priceValuesLoadingStatus = useSelector(getPriceValuesLoadingStatus);
  const isLoaded = priceValuesLoadingStatus === LoadingStatus.Succeeded;

  const dispatch = useDispatch();
  const history = useHistory();

  const initPriceIntervalParams: {[key: string]: string} = {
    priceFrom: '',
    priceTo: '',
  };

  const [priceInterval, setpriceInterval] = useState(initPriceIntervalParams);
  const [stringCountCheckedState, setStringsCountCheckedState] = useState<boolean[]>(initStringCountState);
  const [typeCheckedState, setTypeCheckedState] = useState<boolean[]>(initTypeCheckedState);

  const checkMinPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value < minMaxPriceValues.priceMin || +e.target.value > minMaxPriceValues.priceMax) {
      setpriceInterval((state) => ({
        ...state,
        priceFrom: minMaxPriceValues.priceMin.toString(),
      }));
    } else if(priceInterval.priceTo !== '' && e.target.value > priceInterval.priceTo) {
      setpriceInterval((state) => ({
        ...state,
        priceFrom: priceInterval.priceTo,
      }));
    }
  };

  const checkMaxPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value > minMaxPriceValues.priceMax) {
      setpriceInterval((state) => ({
        ...state,
        priceTo: minMaxPriceValues.priceMax.toString(),
      }));
    } else if(priceInterval.priceFrom !== '' && e.target.value < priceInterval.priceFrom) {
      setpriceInterval((state) => ({
        ...state,
        priceTo: priceInterval.priceFrom,
      }));
    } else if(priceInterval.priceFrom === '' && e.target.value < minMaxPriceValues.priceMin.toString()) {
      setpriceInterval((state) => ({
        ...state,
        priceTo: minMaxPriceValues.priceMin.toString(),
      }));
    }
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setpriceInterval((state) => ({
      ...state,
      priceFrom: e.target.value,
    }));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setpriceInterval((state) => ({
      ...state,
      priceTo: e.target.value,
    }));
  };

  const handleStringsCountCheck = (position: number): void => {
    const updatedStringsCountCheckedState = stringCountCheckedState.map((item, idx) =>
      idx === position ? !item : item,
    );
    setStringsCountCheckedState(updatedStringsCountCheckedState);
  };

  const handleTypeCheck = (position: number): void => {
    const updatedTypeCheckedState = typeCheckedState.map((item, idx) =>
      idx === position ? !item : item,
    );
    setTypeCheckedState(updatedTypeCheckedState);
  };

  // const fetchFilteredGuitars = useCallback(() => {
  //   dispatch(fetchFilteredGuitarsAction(priceInterval));
  // }, [dispatch, priceInterval]);

  // const fetchFilteredGuitars = () => {
  //   dispatch(fetchFilteredGuitarsAction(priceInterval));
  // };

  // useEffect(() => {
  //   dispatch(fetchFilteredGuitarsAction(priceInterval));
  // }, [dispatch, priceInterval]);

  const composeQueryString = useCallback(() => {
    const priceQuery = Object.keys(priceInterval)
      .filter((key) => priceInterval[key] !== '')
      .map((key) => `${priceQueryKey[key]}=${priceInterval[key]}`);

    const typeQuery = guitarsByType
      .filter((_type, idx) => typeCheckedState[idx] === true)
      .map((type) => `type=${type}`);

    const stringCountQuery = guitarsByStringCount
      .filter((_type, idx) => stringCountCheckedState[idx] === true)
      .map((stringCount) => `stringCount=${stringCount}`);

    const query = priceQuery
      .concat(typeQuery, stringCountQuery)
      .join('&');

    return query;
  }, [priceInterval, stringCountCheckedState, typeCheckedState]);

  useEffect(() => {
    const queryString = composeQueryString();
    history.push({
      pathname: AppRoute.GuitarQuery,
      search: `${queryString}`,
    });
  },[composeQueryString, priceInterval, history]);

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
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMin.toString() : '...'} id="priceMin" name="от" onChange={handleMinPriceChange}  onInput={debounce(checkMinPriceInput, 2000)} value={priceInterval.priceFrom} />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMax.toString() : '...'} id="priceMax" name="до" onChange={handleMaxPriceChange}  onInput={debounce(checkMaxPriceInput, 2000)} value={priceInterval.priceTo} />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          guitarsByType.map((type, idx) => (
            <div key={type} className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden"
                type="checkbox"
                id={type}
                name={type}
                defaultChecked={typeCheckedState[idx]}
                onChange={() => handleTypeCheck(idx)}
              />
              <label htmlFor={type}>{GuitarTypeName[capitalizeWord(type)]}</label>
            </div>))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          guitarsByStringCount.map((string, idx) => (
            <div key={string} className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden"
                type="checkbox"
                id={`${string}-strings`}
                name={`${string}-strings`}
                defaultChecked={stringCountCheckedState[idx]}
                onChange={() => handleStringsCountCheck(idx)}
              />
              <label htmlFor={`${string}-strings`}>{string}</label>
            </div>))
        }
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
