/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute, SortingOrder, SortingType, urlSortParams } from '../../../const';
import useQuery from '../../../hooks/use-query';
import { fetchSortedGuitarsAction } from '../../../services/api-actions';
import { setCurrentPage } from '../../../store/action';
import { initialState } from '../../../store/reducers/app-state/app-state';

function CatalogSort(): JSX.Element {
  const [sortingType, setSortingType] = useState<string>(SortingType.Price);
  const [sortingOrder, setSortingOrder] = useState<string>(SortingOrder.Ascending);
  const [firstSortInit, setFirstSortInit] = useState<boolean>(true);

  const byPrice = sortingType === SortingType.Price;
  const byRating = sortingType === SortingType.Rating;
  const byAscending = sortingOrder === SortingOrder.Ascending;
  const byDescending = sortingOrder === SortingOrder.Descending;

  const buttonPriceProps = byPrice ? {tabIndex: -1} : {};
  const buttonRatingProps = byRating ? {tabIndex: -1} : {};
  const buttonAscendingProps = byAscending ? {tabIndex: -1} : {};
  const buttonDescendingProps = byDescending ? {tabIndex: -1} : {};

  const dispatch = useDispatch();
  const history = useHistory();
  const queryString = useQuery();

  const fetchSortedGuitars = useCallback(() => {
    // dispatch(fetchSortedGuitarsAction(sortingType, sortingOrder));
    // console.log('sortingType:', sortingType, 'sortingOrder:',sortingOrder);
  }, [dispatch, sortingOrder, sortingType]);

  useEffect(() => {
    fetchSortedGuitars();
  }, [fetchSortedGuitars]);

  useEffect(() => {
    if(firstSortInit){
      setFirstSortInit(false);
      console.log(firstSortInit);
      return;
    }
    const queryParams = Array.from(queryString.entries())
      .filter((arr) => !Object.values(urlSortParams).includes(arr[0]));

    // console.log(queryParams.map((par) => `${par[0]}=${par[1]}`).join('&'));
    // console.log(queryString.entries());

    queryParams.push([urlSortParams.SortingType, sortingType]);
    queryParams.push([urlSortParams.SortingOrder, sortingOrder]);

    if(!firstSortInit) {
      dispatch(setCurrentPage(initialState.currentPage));
      history.push({
        pathname: AppRoute.GuitarQuery,
        search: queryParams.map((par) => `${par[0]}=${par[1]}`).join('&'),
      });
    }
  }, [sortingType, sortingOrder, history]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button${byPrice ? ' catalog-sort__type-button--active' : ''}`} aria-label="по цене" {...buttonPriceProps} onClick={() => setSortingType(SortingType.Price)}>по цене</button>
        <button className={`catalog-sort__type-button${byRating ? ' catalog-sort__type-button--active' : ''}`} aria-label="по популярности" {...buttonRatingProps} onClick={() => setSortingType(SortingType.Rating)}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up${byAscending ? ' catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию" {...buttonAscendingProps} onClick={() => setSortingOrder(SortingOrder.Ascending)}></button>
        <button className={`catalog-sort__order-button catalog-sort__order-button--down${byDescending ? ' catalog-sort__order-button--active' : ''}`} aria-label="По убыванию" {...buttonDescendingProps} onClick={() => setSortingOrder(SortingOrder.Descending)}></button>
      </div>
    </div>
  );
}

export default CatalogSort;
