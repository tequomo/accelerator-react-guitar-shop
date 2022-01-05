/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, guitarsByType, guitarTypeName, guitarTypes, LoadingStatus, priceQueryKey, urlParams } from '../../../const';
import useQuery from '../../../hooks/use-query';
import { fetchMinMaxPriceValuesAction } from '../../../services/api-actions';
import { getMinMaxPriceValues, getPriceValuesLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { capitalizeWord, debounce } from '../../../utils/utils';


const guitarsByStringCount = [4, 6, 7, 12];
const initStringCountState: boolean[] = new Array(guitarsByStringCount.length).fill(false);
const initTypeCheckedState: boolean[] = new Array(guitarTypes.length).fill(false);

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
  const [stringCountCheckedState, setStringCountCheckedState] = useState<boolean[]>(initStringCountState);
  const [typeCheckedState, setTypeCheckedState] = useState<boolean[]>(initTypeCheckedState);
  const [stringCountDisabledState, setStringCountDisabledState] = useState<boolean[]>(initStringCountState);

  const [minMaxQueryString, setMinMaxQueryString] = useState<string>('');
  const [firstFilterInit, setFirstFilterInit] = useState<boolean>(true);

  const queryString = useQuery();

  useEffect(() => {
    const queryParams: {[key:string]: string[]} = {};

    if(firstFilterInit) {
      urlParams.forEach((param) => {
        const value = queryString.getAll(param);
        if(value) {
          queryParams[param] = value;
        }
      });
      // eslint-disable-next-line no-console
      console.log('queryParams', queryParams);

      if(queryParams['price_gte'].length) {
        setpriceInterval((state) => ({
          ...state,
          priceFrom: queryParams['price_gte'].join(''),
        }));
        console.log('priceInterval', priceInterval);
      }
      if(queryParams['price_lte'].length) {
        setpriceInterval((state) => ({
          ...state,
          priceTo: queryParams['price_lte'].join(''),
        }));
        console.log('priceInterval', priceInterval);
      }
      if(queryParams['type'].length) {
        const typeFilter = guitarTypes
          .map((guitar) => queryParams['type'].includes(guitar.type));
        setTypeCheckedState(typeFilter);
        console.log('typeCheckedState', typeFilter);
      }
      if(queryParams['stringCount'].length) {
        const stringCountFilter = guitarsByStringCount
          .map((string) => queryParams['stringCount'].includes(string.toString()));
        setStringCountCheckedState(stringCountFilter);
        console.log('stringCountCheckedState', stringCountFilter);
      }
      setFirstFilterInit(false);
      console.log('firstFilterInit', firstFilterInit);
    }
  }, [queryString]);

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
  // const checkStringCountInput = ШОБ НЕ ЗАБЫТЬ!
  useEffect(() => {
    let disabledState = initStringCountState;
    if(typeCheckedState.includes(true)) {
      const availableStringCounts = new Set<number>();
      // const selectedGuitarTypes = guitarTypes
      guitarTypes
        .filter((_guitar, idx) => typeCheckedState[idx])
        .forEach((guitar) => {
          guitar.stringCount.forEach((stringCount: number) => {
            availableStringCounts.add(stringCount);
          });
        });
      disabledState = guitarsByStringCount.map((count) => !availableStringCounts.has(count));
    }
    setStringCountDisabledState(disabledState);
    // if(!firstFilterInit) {
    setStringCountCheckedState(initStringCountState);
    // }
    // const availableStringCounts = [...new Set(selectedGuitarTypes.reduce((a, b) => a.concat(b), []))].sort((a, b) => a - b);
    // const disabledState = guitarsByStringCount.map((count) => availableStringCounts.includes(count));
  }, [firstFilterInit, typeCheckedState]);

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
    setStringCountCheckedState(() => updatedStringsCountCheckedState);
  };

  const handleTypeCheck = (position: number): void => {
    const updatedTypeCheckedState = typeCheckedState.map((item, idx) =>
      idx === position ? !item : item,
    );
    // eslint-disable-next-line no-console
    console.log('updatedTypeCheckedState', updatedTypeCheckedState);
    setTypeCheckedState(() => updatedTypeCheckedState);
  };

  // useEffect(() => {
  //   dispatch(fetchFilteredGuitarsAction(priceInterval));
  // }, [dispatch, priceInterval]);
  //const composeQueryString ШОБ НЕ ЗАБЫТЬ

  useEffect(() => {
    const priceQuery = Object.keys(priceInterval)
      .filter((key) => !!priceInterval[key])
      .map((key) => `${priceQueryKey[key]}=${priceInterval[key]}`);

    const typeQuery = guitarsByType
      .filter((_type, idx) => typeCheckedState[idx])
      .map((type) => `type=${type}`);
    // eslint-disable-next-line no-console
    // console.log('stringCountCheckedState', stringCountCheckedState);

    const stringCountQuery = guitarsByStringCount
      .filter((_type, idx) => stringCountCheckedState[idx])
      .map((stringCount) => `stringCount=${stringCount}`);

    const query = priceQuery
      .concat(typeQuery, stringCountQuery)
      .join('&');

    const minMaxQuery = typeQuery
      .concat(stringCountQuery)
      .join('&');

    setMinMaxQueryString(minMaxQuery);
    // eslint-disable-next-line no-console
    // console.log(minMaxQuery);
    history.push({
      pathname: AppRoute.GuitarQuery,
      search: query,
    });
  }, [history, priceInterval, stringCountCheckedState, typeCheckedState]);

  useEffect(() => {
    dispatch(fetchMinMaxPriceValuesAction(minMaxQueryString));
  }, [dispatch, minMaxQueryString]);

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
                checked={typeCheckedState[idx]}
                onChange={() => handleTypeCheck(idx)}
              />
              <label htmlFor={type}>{guitarTypeName[capitalizeWord(type)]}</label>
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
                checked={stringCountCheckedState[idx]}
                disabled={stringCountDisabledState[idx]}
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
