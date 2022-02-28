import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, REQUEST_DELAY } from '../../../../const';
import { fetchSearchGuitarAction } from '../../../../services/api-actions';
import { getSearchGuitars } from '../../../../store/reducers/guitars-data/selectors';
import { debounce } from '../../../../utils/utils';

function FormSearch(): JSX.Element {

  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchResult = useSelector(getSearchGuitars)?.slice().sort((a, b) => b.name.localeCompare(a.name));

  const dispatch = useDispatch();

  const history = useHistory();

  const handleItemClick = (id: number): void => {
    setSearchQuery('');
    history.push(`${AppRoute.Guitar}${id}`);
  };

  const handleItemKeyboardClick = (evt: KeyboardEvent<HTMLLIElement>, id: number): void => {
    if(evt.code === ('Enter') || evt.keyCode === 13) {
      handleItemClick(id);
    }
    if(evt.code === ('Space') || evt.keyCode === 32) {
      evt.stopPropagation();
      handleItemClick(id);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchSearchGuitarAction(searchQuery));
  },[dispatch, searchQuery]);

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit" onClick={() => {
          if(searchQuery) {
            setSearchQuery('');
          }}}
        >
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref={`#icon-${searchQuery ? 'close-white' : 'search'}`}></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input ref={inputRef} className="form-search__input" id="search" data-testid="search" type="text" autoComplete="off" placeholder="что вы ищете?" onChange={debounce<ChangeEvent<HTMLInputElement>>((e) => setSearchQuery(e.target.value), REQUEST_DELAY)} onFocus={(e) => setSearchQuery(e.target.value)}/>
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {searchResult &&
        <ul className="form-search__select-list">
          {searchResult.length ? searchResult.map(({id, name}, idx) => (
            <li key={`${name}-${id}`} role={'button'} className="form-search__select-item" tabIndex={0} onClick={() => handleItemClick(id)} onKeyDown={(evt) => handleItemKeyboardClick(evt, id)}>
              {name}
            </li>)) :
            <li className="form-search__select-item" tabIndex={0}>Ничего не нашлось</li>}
        </ul>}
    </div>
  );
}

export default FormSearch;
