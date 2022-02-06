import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  GUITARS_TYPES,
  LoadingStatus,
  PriceQueryKey,
  UrlFilterParams,
  UrlSortParams
} from '../../../const';
import useQuery from '../../../hooks/use-query';
import { fetchMinMaxPriceValuesAction } from '../../../services/api-actions';
import { setCurrentPage } from '../../../store/action';
import { getMinMaxPriceValues, getPriceValuesLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { capitalizeWord, debounce } from '../../../utils/utils';

type PriceIntervalType = {
  [key:string]: string;
}

type FiltersType = {
  priceInterval: PriceIntervalType,
  stringCountCheckedState: boolean[],
  typeCheckedState: boolean[],
  stringCountDisabledState: boolean[],
}

const styleOpacity = {
  min: 0.5,
  max: 1,
};

const guitarsByStringCount = [4, 6, 7, 12];
const guitarsByType = GUITARS_TYPES.map((guitar) => guitar.type);
const initStringCountState: boolean[] = new Array(guitarsByStringCount.length).fill(false);
const initTypeCheckedState: boolean[] = new Array(GUITARS_TYPES.length).fill(false);

function CatalogFilter(): JSX.Element {

  const minMaxPriceValues = useSelector(getMinMaxPriceValues);
  const priceValuesLoadingStatus = useSelector(getPriceValuesLoadingStatus);
  const isLoaded = priceValuesLoadingStatus === LoadingStatus.Succeeded;

  const dispatch = useDispatch();
  const history = useHistory();

  const defaultFilters = useMemo(() => ({
    priceInterval: {
      priceFrom: '',
      priceTo: '',
    },
    stringCountCheckedState: [...initStringCountState],
    typeCheckedState: [...initTypeCheckedState],
    stringCountDisabledState: [...initStringCountState],
  }), []);

  const [filters, setFilters] = useState<FiltersType>(defaultFilters);

  const [minMaxQueryString, setMinMaxQueryString] = useState<string>('');

  const [firstFilterInit, setFirstFilterInit] = useState<boolean>(true);

  const queryString = useQuery();

  useEffect(() => {
    const queryParams: {[key:string]: string[]} = {};

    if(firstFilterInit) {
      Object.values(UrlFilterParams).forEach((param) => {
        const value = queryString.getAll(param);
        if(value) {
          queryParams[param] = value;
        }
      });
      const queryFilters: FiltersType = {...defaultFilters};

      if(queryParams[UrlFilterParams.PriceFrom].length) {
        queryFilters.priceInterval.priceFrom = queryParams[UrlFilterParams.PriceFrom].join('');
      }
      if(queryParams[UrlFilterParams.PriceTo].length) {
        queryFilters.priceInterval.priceTo = queryParams[UrlFilterParams.PriceTo].join('');
      }
      if(queryParams[UrlFilterParams.Type].length) {
        queryFilters.typeCheckedState = GUITARS_TYPES
          .map((guitar) => queryParams[UrlFilterParams.Type].includes(guitar.type));
        const disabledState = checkStringCountDisabledInput(queryFilters.typeCheckedState);
        queryFilters.stringCountDisabledState = disabledState;
      }
      if(queryParams[UrlFilterParams.StringCount].length) {
        queryFilters.stringCountCheckedState = guitarsByStringCount
          .map((string) => queryParams[UrlFilterParams.StringCount].includes(string.toString()));
      }
      setFilters(queryFilters);
    }
  }, [defaultFilters, firstFilterInit, queryString]);

  const checkMinPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value) {
      if(+e.target.value < minMaxPriceValues.priceMin) {
        setFilters((state) => ({
          ...state,
          priceInterval: {
            ...state.priceInterval,
            priceFrom: minMaxPriceValues.priceMin.toString(),
          },
        }));
      } else if(+e.target.value > (+filters.priceInterval.priceTo || minMaxPriceValues.priceMax)) {
        setFilters((state) => ({
          ...state,
          priceInterval: {
            ...state.priceInterval,
            priceFrom: filters.priceInterval.priceTo || minMaxPriceValues.priceMax.toString(),
          },
        }));
      }
    }
  };

  const checkMaxPriceInput = (e: ChangeEvent<HTMLInputElement>): void => {
    if(+e.target.value) {
      if(+e.target.value > minMaxPriceValues.priceMax) {
        setFilters((state) => ({
          ...state,
          priceInterval: {
            ...state.priceInterval,
            priceTo: minMaxPriceValues.priceMax.toString(),
          },
        }));
      } else if(+e.target.value < (+filters.priceInterval.priceFrom || minMaxPriceValues.priceMin)) {
        setFilters((state) => ({
          ...state,
          priceInterval: {
            ...state.priceInterval,
            priceTo: filters.priceInterval.priceFrom || minMaxPriceValues.priceMin.toString(),
          },
        }));
      }
    }
  };

  const checkStringCountDisabledInput = (updatedTypeCheckedState: boolean[]) => {
    const availableStringCounts = new Set<number>();
    let disabledState = initStringCountState;
    if(updatedTypeCheckedState.includes(true)) {
      GUITARS_TYPES
        .filter((_guitar, idx) => updatedTypeCheckedState[idx])
        .forEach((guitar) => {
          guitar.stringCount.forEach((stringCount: number) => {
            availableStringCounts.add(stringCount);
          });
        });
      disabledState = guitarsByStringCount.map((count) => !availableStringCounts.has(count));
    }
    return disabledState;
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((state) => ({
      ...state,
      priceInterval: {
        ...state.priceInterval,
        priceFrom: e.target.value,
      },
    }));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((state) => ({
      ...state,
      priceInterval: {
        ...state.priceInterval,
        priceTo: e.target.value,
      },
    }));
  };

  const handleStringCountCheck = (position: number): void => {
    const updatedStringCountCheckedState = filters.stringCountCheckedState.map((item, idx) =>
      idx === position ? !item : item,
    );
    setFilters((state) => ({
      ...state,
      stringCountCheckedState: [...updatedStringCountCheckedState],
    }));
  };

  const handleTypeCheck = (position: number): void => {
    const updatedTypeCheckedState = filters.typeCheckedState.map((item, idx) =>
      idx === position ? !item : item,
    );

    const disabledState = checkStringCountDisabledInput(updatedTypeCheckedState);

    setFilters((state) => ({
      ...state,
      typeCheckedState: [...updatedTypeCheckedState],
      stringCountCheckedState: [...initStringCountState],
      stringCountDisabledState: [...disabledState],
    }));
  };

  useEffect(() => {
    if(firstFilterInit){
      setFirstFilterInit(false);
      return;
    }
    const priceQuery = Object.keys(filters.priceInterval)
      .filter((key) => !!filters.priceInterval[key])
      .map((key) => `${PriceQueryKey[capitalizeWord(key)]}=${filters.priceInterval[key]}`);

    const typeQuery = guitarsByType
      .filter((_type, idx) => filters.typeCheckedState[idx])
      .map((type) => `type=${type}`);

    const stringCountQuery = guitarsByStringCount
      .filter((_type, idx) => filters.stringCountCheckedState[idx])
      .map((stringCount) => `stringCount=${stringCount}`);

    let query = priceQuery
      .concat(typeQuery, stringCountQuery)
      .join('&');

    const minMaxQuery = typeQuery
      .concat(stringCountQuery)
      .join('&');

    const queryParams = new Map(Array.from(queryString.entries()));
    const sortingType = queryParams.get(UrlSortParams.Type);
    const sortingOrder = queryParams.get(UrlSortParams.Order);

    if(!firstFilterInit && sortingType) {
      query = `${query}&${UrlSortParams.Type}=${sortingType}&${UrlSortParams.Order}=${sortingOrder}`;
    }

    setMinMaxQueryString(minMaxQuery);
    dispatch(setCurrentPage(1));
    history.push({
      search: query,
    });
  }, [JSON.stringify(filters), queryString]);

  useEffect(() => {
    dispatch(fetchMinMaxPriceValuesAction(minMaxQueryString));
  }, [dispatch, minMaxQueryString]);

  return (
    <form className="catalog-filter" style={{opacity: firstFilterInit ? styleOpacity.min : styleOpacity.max,
      pointerEvents: firstFilterInit? 'none': 'all'}}
    >
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMin.toString() : '...'}
              id="priceMin" name="от"
              onChange={handleMinPriceChange}  onInput={debounce(checkMinPriceInput, 1500)}
              value={filters.priceInterval.priceFrom}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={isLoaded ? minMaxPriceValues.priceMax.toString() : '...'}
              id="priceMax" name="до" onChange={handleMaxPriceChange}  onInput={debounce(checkMaxPriceInput, 1500)}
              value={filters.priceInterval.priceTo}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          GUITARS_TYPES.map(({type, sectionName}, idx) => (
            <div key={type} className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" data-testid="guitarType"
                type="checkbox"
                id={type}
                name={type}
                checked={filters.typeCheckedState[idx]}
                onChange={() => handleTypeCheck(idx)}
              />
              <label htmlFor={type}>{sectionName}</label>
            </div>))
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          guitarsByStringCount.map((string, idx) => (
            <div key={string} className="form-checkbox catalog-filter__block-item">
              <input className="visually-hidden" data-testid="guitarStringCount"
                type="checkbox"
                id={`${string}-strings`}
                name={`${string}-strings`}
                checked={filters.stringCountCheckedState[idx]}
                disabled={filters.stringCountDisabledState[idx]}
                onChange={() => handleStringCountCheck(idx)}
              />
              <label htmlFor={`${string}-strings`}>{string}</label>
            </div>))
        }
      </fieldset>
    </form>
  );
}

export default CatalogFilter;
