import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_DELAY } from '../../../../const';
import { fetchSearchGuitarAction } from '../../../../services/api-actions';
import { getSearchGuitars/*, getSearchLoadingStatus*/ } from '../../../../store/reducers/guitars-data/selectors';
import { debounce } from '../../../../utils/utils';

function FormSearch(): JSX.Element {

  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchResult = useSelector(getSearchGuitars);
  // const searchResultLoadingStatus = useSelector(getSearchLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchGuitarAction(searchQuery));
  },[dispatch, searchQuery]);

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищете?" onChange={debounce<ChangeEvent<HTMLInputElement>>((e) => setSearchQuery(e.target.value), REQUEST_DELAY)} />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {searchResult &&
        <ul className="form-search__select-list">
          {searchResult.length ? searchResult.map(({id, name}, idx) =>
            <li key={`${name}-${id}`} className="form-search__select-item" tabIndex={idx}>{name}</li>) :
            <li className="form-search__select-item" tabIndex={0}>Ничего не нашлось</li>}
        </ul>}
    </div>
  );
}

export default FormSearch;
