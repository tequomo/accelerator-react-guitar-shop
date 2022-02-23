/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStatus } from '../../../const';
import { postGuitarReviewAction } from '../../../services/api-actions';
import { setUploadReviewLoadingStatus } from '../../../store/action';
import {
  getUploadReviewLoadingStatus
} from '../../../store/reducers/guitar-reviews-data/selectors';
import { GuitarType } from '../../../types/guitar-type';
import { ReviewPostType } from '../../../types/review-type';
import ReviewRating from '../review-rating/review-rating';

type ReviewProps = {
  activeGuitar: GuitarType | null,
  isVisible: boolean,
  onModalClose: () => void,
  onSuccess: () => void,
}

function ModalReview({activeGuitar, isVisible, onModalClose, onSuccess}: ReviewProps): JSX.Element {

  const initReviewPost: ReviewPostType = {
    guitarId: activeGuitar?.id ?? 0,
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  };

  const [userReview, setUserReview] = useState<ReviewPostType>(initReviewPost);
  const uploadReviewLoadingStatus = useSelector(getUploadReviewLoadingStatus);
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();

  const handleModalClickClose = useCallback((): void => {
    onModalClose();
    document.body.style.overflow = '';
  }, [onModalClose]);

  const handleModalEscClose = (event: KeyboardEvent) => {
    if(event.key === 'Escape' || event.keyCode === 27) {
      onModalClose();
      document.body.style.overflow = '';
    }
  };

  const {userName, advantage, disadvantage, comment, rating} = userReview;

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserReview((state) => ({
      ...state,
      userName: e.target.value,
    }));
  };

  const handleAdvantageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserReview((state) => ({
      ...state,
      advantage: e.target.value,
    }));
  };

  const handleDisadvantageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserReview((state) => ({
      ...state,
      disadvantage: e.target.value,
    }));
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserReview((state) => ({
      ...state,
      rating: +(e.target.value),
    }));
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setUserReview((state) => ({
      ...state,
      comment: e.target.value,
    }));
  };

  const checkEmptyFields = () => {
    const updatedUserReview = userReview;
    if(userReview.advantage === '') {
      updatedUserReview.advantage = 'Всё хорошо';
    }
    if(userReview.disadvantage === '') {
      updatedUserReview.disadvantage = 'Недостатков не обнаружено';
    }
    if(userReview.comment === '') {
      updatedUserReview.comment = 'Комментарии излишни';
    }
    setUserReview(updatedUserReview);
  };

  const postGuitarReview = (review: ReviewPostType): void => {
    dispatch(postGuitarReviewAction(review));
  };

  useEffect(() => {
    if (uploadReviewLoadingStatus === LoadingStatus.Succeeded) {
      setIsLoad((state) => !state);
    }
    dispatch(setUploadReviewLoadingStatus(LoadingStatus.Idle));
  }, [dispatch, uploadReviewLoadingStatus]);

  useEffect(() => {
    if(isLoad) {
      handleModalClickClose();
      onSuccess();
      setIsLoad((state) => !state);
    }
  }, [handleModalClickClose, isLoad, onSuccess]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    checkEmptyFields();
    postGuitarReview(userReview);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleModalEscClose);
    return () => {
      document.removeEventListener('keydown', handleModalEscClose);
    };
  });

  return (
    <ReactFocusLock>
      <div className={`modal ${isVisible ? 'is-active ' : ''}modal--review modal-for-ui-kit`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleModalClickClose}></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{activeGuitar?.name}</h3>
            <form className="form-review" onSubmit={handleFormSubmit}>
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" value={userName} onChange={handleUserNameChange} required>
                  </input>
                  {userName.length === 0 && <span className="form-review__warning">Заполните поле</span>}
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse" dir="rtl">
                    <ReviewRating rating={rating} onRatingChange={handleRatingChange}/>
                    <span className="rate__count"></span>
                    {rating === 0 && <span className="rate__message">Поставьте оценку</span>}
                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="pros">Достоинства</label>
              <input className="form-review__input" id="pros" type="text" autoComplete="off" value={advantage} onChange={handleAdvantageChange}></input>
              <label className="form-review__label" htmlFor="cons">Недостатки</label>
              <input className="form-review__input" id="cons" type="text" autoComplete="off" value={disadvantage} onChange={handleDisadvantageChange}></input>
              <label className="form-review__label" htmlFor="comment">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off" value={comment} onChange={handleCommentChange}></textarea>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={handleModalClickClose}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default ModalReview;
