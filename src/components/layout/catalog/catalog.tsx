/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { CARDS_PER_PAGE, LoadingStatus } from '../../../const';
import { fetchGuitarsAction } from '../../../services/api-actions';
import { setCurrentPage } from '../../../store/action';
import { getCurrentPage } from '../../../store/reducers/app-state/selectors';
import { getGuitars, getGuitarsLoadingStatus } from '../../../store/reducers/guitars-data/selectors';
import { GuitarType } from '../../../types/guitar-type';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import GuitarCard from '../guitar-card/guitar-card';
import LoaderWrapper from '../loader-wrapper/loader-wrapper';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import Pagination, { ParamsPropsType } from '../pagination/pagination';


function Catalog(): JSX.Element {


  const guitars = useSelector(getGuitars).slice(0, CARDS_PER_PAGE);
  const guitarsLoadingStatus = useSelector(getGuitarsLoadingStatus);
  const isGuitarsLoad = guitarsLoadingStatus === LoadingStatus.Succeeded;
  const currentPage = useSelector(getCurrentPage);
  const { pageNumber } = useParams<ParamsPropsType>();

  const [modalAddCardVisible, setModalAddCardVisible] = useState<boolean>(false);
  const [activeGuitar, setActiveGuitar] = useState<GuitarType | []>([]);

  const dispatch = useDispatch();

  const { search } = useLocation();

  // const fetchGuitars = useCallback(() => {
  //   // dispatch(fetchGuitarsAction(search));
  //   console.log('get guitars');
  // }, [dispatch, search]);
  useEffect(() => {
    console.log('useEffect', search, currentPage);
    const pages = `${search ? '&' : '?'}_start=${(currentPage - 1) * CARDS_PER_PAGE}&_end=${currentPage * CARDS_PER_PAGE}`;
    dispatch(fetchGuitarsAction(search + pages));
  }, [dispatch, search, currentPage]);

  useEffect(() => {
    dispatch(setCurrentPage(+pageNumber || 1));
  }, []);

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
      {modalAddCardVisible && <ModalCartAdd isVisible={modalAddCardVisible} onModalClose={() => setModalAddCardVisible(false)} activeGuitar={activeGuitar}/>}
      <Pagination />
    </div>
  );
}

export default Catalog;
