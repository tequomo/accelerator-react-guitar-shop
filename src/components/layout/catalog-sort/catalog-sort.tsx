import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortingOrder, SortingType } from '../../../const';
import { fetchSortedGuitarsAction } from '../../../services/api-actions';

function CatalogSort(): JSX.Element {

  const [sortingType, setSortingType] = useState<string>(SortingType.Price);
  const [sortingOrder, setSortingOrder] = useState<string>(SortingOrder.Ascending);

  const byPrice = sortingType === SortingType.Price;
  const byRating = sortingType === SortingType.Rating;
  const byAscending = sortingOrder === SortingOrder.Ascending;
  const byDescending = sortingOrder === SortingOrder.Descending;

  const buttonPriceProps = byPrice ? {tabIndex: -1} : {};
  const buttonRatingProps = byRating ? {tabIndex: -1} : {};
  const buttonAscendingProps = byAscending ? {tabIndex: -1} : {};
  const buttonDescendingProps = byDescending ? {tabIndex: -1} : {};

  const dispatch = useDispatch();

  const fetchSortedGuitars = useCallback(() => {
    dispatch(fetchSortedGuitarsAction(sortingType, sortingOrder));
  }, [dispatch, sortingOrder, sortingType]);

  useEffect(() => {
    fetchSortedGuitars();
  }, [fetchSortedGuitars]);


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
