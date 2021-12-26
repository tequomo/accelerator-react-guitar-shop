import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../../store/reducers/guitars-data/selectors';

// type FilterParamsType = {
//   filterByPrice: number[],
//   filterByType: string,
// }

type ByPriceType = {
  priceMin: number,
  priceMax: number,
}

function CatalogFilter(): JSX.Element {

  const guitars = useSelector(getGuitars);
  const minPriceValue = Math.min(...guitars.map((guitar) => guitar.price));
  const maxPriceValue = Math.max(...guitars.map((guitar) => guitar.price));

  // const initFilterParams = {
  //   filterByPrice: [minPriceValue, maxPriceValue],
  //   filterByType: '',
  // };

  const initPriceParams: ByPriceType = {
    priceMin: minPriceValue,
    priceMax: maxPriceValue,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [filterParams, setFilterParams] = useState<FilterParamsType>(initFilterParams);
  const [filterByPrice, setFilterByPrice] = useState<ByPriceType>(initPriceParams);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterByType, setFilterByType] = useState<string>('');

  // const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setFilterParams((state) => ({
  //     ...state,
  //     filterByPrice: [
  //       +e.target.value,
  //       ...rest,
  //     ],
  //   }));
  // };

  // eslint-disable-next-line no-console
  // console.log(filterParams);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterByPrice((state) => ({
      ...state,
      priceMin: +e.target.value,
    }));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterByPrice((state) => ({
      ...state,
      priceMax: +e.target.value,
    }));
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder={minPriceValue.toString()} id="priceMin" name="от" onChange={handleMinPriceChange} value={filterByPrice.priceMin}/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder={maxPriceValue.toString()} id="priceMax" name="до" onChange={handleMaxPriceChange} value={filterByPrice.priceMax}/>
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
