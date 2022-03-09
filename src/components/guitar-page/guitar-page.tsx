import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, LoadingStatus } from '../../const';
import { fetchCurrentGuitarAction } from '../../services/api-actions';
import { getCurrentGuitar, getCurrentGuitarLoadingStatus } from '../../store/reducers/current-guitar-data/selectors';
import { GuitarType } from '../../types/guitar-type';
import Footer from '../layout/footer/footer';
import Header from '../layout/header/header';
import LoaderWrapper from '../layout/loader-wrapper/loader-wrapper';
import ModalCartAdd from '../layout/modal-cart-add/modal-cart-add';
import ModalReview from '../layout/modal-review/modal-review';
import ModalSuccessAdd from '../layout/modal-success-add/modal-success-add';
import ModalSuccessReview from '../layout/modal-success-review/modal-success-review';
import GuitarContainer from './guitar-container/guitar-container';
import ReviewsList from './reviews-list/reviews-list';


type ParamsPropsType = {
    id: string,
  }

function GuitarPage(): JSX.Element {

  const { id } = useParams<ParamsPropsType>();

  const currentGuitar = useSelector(getCurrentGuitar);
  const currentGuitarLoadingStatus = useSelector(getCurrentGuitarLoadingStatus);

  const [modalAddCartVisible, setModalAddCartVisible] = useState<boolean>(false);
  const [modalAddReviewVisible, setModalAddReviewVisible] = useState<boolean>(false);
  const [modalSuccessReviewVisible, setModalSuccessReviewVisible] = useState<boolean>(false);
  const [modalSuccessAddVisible, setModalSuccessAddVisible] = useState<boolean>(false);


  const dispatch = useDispatch();

  const fetchCurrentGuitar = useCallback(() => {
    dispatch(fetchCurrentGuitarAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchCurrentGuitar();
  }, [fetchCurrentGuitar]);

  const handleAddCartClick = (evt: MouseEvent<HTMLAnchorElement>, guitar: GuitarType): void => {
    evt.preventDefault();
    setModalAddCartVisible((state) => !state);
    document.body.style.overflow = 'hidden';
  };

  const handleAddReviewClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    setModalAddReviewVisible((state) => !state);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{currentGuitar?.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">{currentGuitar?.name}</Link>
            </li>
          </ul>
          <LoaderWrapper isLoad={currentGuitarLoadingStatus === LoadingStatus.Succeeded}>
            <GuitarContainer guitar={currentGuitar as GuitarType} onAddCartClick={handleAddCartClick}/>
          </LoaderWrapper>
          {modalAddCartVisible && <ModalCartAdd isVisible={modalAddCartVisible} onModalClose={() => setModalAddCartVisible(false)} activeGuitar={currentGuitar} onSuccess={() => setModalSuccessAddVisible((state) => !state)}/>}
          <ReviewsList onAddReviewClick={handleAddReviewClick}/>
          {modalAddReviewVisible && <ModalReview isVisible={modalAddReviewVisible} onModalClose={() => setModalAddReviewVisible(false)} onSuccess={() => setModalSuccessReviewVisible((state) => !state)} activeGuitar={currentGuitar}/>}
          {modalSuccessReviewVisible && <ModalSuccessReview isVisible={modalSuccessReviewVisible} onModalClose={() => setModalSuccessReviewVisible(false)}/>}
          {modalSuccessAddVisible && <ModalSuccessAdd isVisible={modalSuccessAddVisible} onModalClose={() => setModalSuccessAddVisible(false)}/>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GuitarPage;
