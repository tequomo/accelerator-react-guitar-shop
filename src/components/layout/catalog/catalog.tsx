import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CARDS_PER_PAGE, LoadingStatus } from '../../../const';
import { fetchGuitarsAction } from '../../../services/api-actions';
import { getGuitars, getGuitarsLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { GuitarType } from '../../../types/guitar-type';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import GuitarCard from '../guitar-card/guitar-card';
import LoaderWrapper from '../loader-wrapper/loader-wrapper';
import ModalCardAdd from '../modal/modal-cart-add';
import Pagination from '../pagination/pagination';


function Catalog(): JSX.Element {


  const guitars = useSelector(getGuitars).slice(0, CARDS_PER_PAGE);
  const guitarsLoadingStatus = useSelector(getGuitarsLoadingStatus);
  const isGuitarsLoad = guitarsLoadingStatus === LoadingStatus.Succeeded;

  const [modalAddCardVisible, setModalAddCardVisible] = useState<boolean>(false);
  const [activeGuitar, setActiveGuitar] = useState<GuitarType | []>([]);

  const dispatch = useDispatch();

  const { search } = useLocation();

  const fetchGuitars = useCallback(() => {
    dispatch(fetchGuitarsAction(search));
  }, [dispatch, search]);

  useEffect(() => {
    fetchGuitars();
  }, [fetchGuitars]);

  const handleAddCartClick = (evt: MouseEvent<HTMLAnchorElement>, guitar: GuitarType): void => {
    evt.preventDefault();
    setModalAddCardVisible((state) => !state);
    setActiveGuitar(guitar);
  };

  return (
    <div className="catalog">
      <CatalogFilter />
      <CatalogSort />
      <LoaderWrapper isLoad={isGuitarsLoad}>
        <div className="cards catalog__cards">
          {
            guitars.length ?
              guitars.map((guitar: GuitarType) => <GuitarCard key={guitar.vendorCode} guitar={guitar} onAddCartClick={handleAddCartClick}/>) :
              <div style={{gridColumn: '1 / -1'}}>Товары, соответствующие выбранным параметрам, не найдены.</div>
          }
        </div>
      </LoaderWrapper>
      {modalAddCardVisible && <ModalCardAdd isVisible={modalAddCardVisible} onModalClose={() => setModalAddCardVisible(false)} activeGuitar={activeGuitar}/>}
      <Pagination />
    </div>
  );
}

export default Catalog;
