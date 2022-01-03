import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CARDS_PER_PAGE } from '../../../const';
import { /*fetchFilteredGuitarsAction,*/ fetchGuitarsAction } from '../../../services/api-actions';
import { getGuitars } from '../../../store/reducers/guitars-data/selectors';
import { GuitarType } from '../../../types/guitar-type';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import GuitarCard from '../guitar-card/guitar-card';
import Pagination from '../pagination/pagination';


function Catalog(): JSX.Element {

  const guitars = useSelector(getGuitars).slice(0, CARDS_PER_PAGE);

  const dispatch = useDispatch();

  const { search } = useLocation();

  const fetchGuitars = useCallback(() => {
    dispatch(fetchGuitarsAction(search));
  }, [dispatch, search]);

  useEffect(() => {
    fetchGuitars();
  }, [fetchGuitars]);

  // useEffect(() => {
  //   dispatch(fetchFilteredGuitarsAction(search));
  // }, [dispatch, search]);

  return (
    <div className="catalog">
      <CatalogFilter />
      <CatalogSort />
      <div className="cards catalog__cards">
        {
          guitars.map((guitar: GuitarType) => <GuitarCard key={guitar.vendorCode} guitar={guitar}/>)
        }
      </div>
      <Pagination />
    </div>
  );
}

export default Catalog;
