/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { AppRoute, CARDS_PER_PAGE, urlPaginationParams } from '../../../const';
import useQuery from '../../../hooks/use-query';
import { fetchGuitarsAction } from '../../../services/api-actions';
import { setCurrentPage } from '../../../store/action';
import { initialState } from '../../../store/reducers/app-state/app-state';
import { getCurrentPage, getTotalCountGuitars } from '../../../store/reducers/app-state/selectors';

type PageServingType = {
  start: number,
  end: number,
}

export type ParamsPropsType = {
  pageNumber: string,
}

function Pagination(): JSX.Element {

  const history = useHistory();
  const queryString = useQuery();
  const { search } = useLocation();
  const { pageNumber } = useParams<ParamsPropsType>();
  const totalCountGuitars = useSelector(getTotalCountGuitars);
  const currentPage = useSelector(getCurrentPage);

  const dispatch = useDispatch();

  const queryPageNumber =  pageNumber ?? 1;

  const initPageServing: PageServingType = {
    start: 0,
    end: CARDS_PER_PAGE - 1,
  };

  const totalPagesCount = Math.ceil(totalCountGuitars / CARDS_PER_PAGE);
  const totalPagesList: number[] = new Array(totalPagesCount).fill(false).map((_page, idx) => idx + 1);
  const firstPage = Math.min(...totalPagesList);
  const lastPage = Math.max(...totalPagesList);

  const [pageServing, setPageServing] = useState<PageServingType>(initPageServing);
  const updatePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handlePageChange = (evt: MouseEvent<HTMLAnchorElement>, page: number) => {
    evt.preventDefault();
    updatePage(page);
  };

  useEffect(() => {
    history.push({
      pathname: `${AppRoute.GuitarQuery}/page_${currentPage}`,
      search: search,
    });
  }, [currentPage, history, search]);
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          +queryPageNumber !== firstPage ?
            <li className="pagination__page pagination__page--prev" id="prev">
              <a className="link pagination__page-link" href={`page_${(currentPage - 1).toString()}`} onClick={(e) => handlePageChange(e, currentPage - 1)}>Назад</a>
            </li> : ''
        }
        {
          totalPagesList
            .map((page) =>(
              <li key={`page_${page}`} className={`pagination__page${currentPage === page ? ' pagination__page--active' : ''}`}>
                <a className="link pagination__page-link" href={`page_${page.toString()}`} onClick={(e) => handlePageChange(e, page)} data-testid="pageItem">{page}</a>
              </li>
            ),
            )
        }
        {
          +queryPageNumber !== lastPage ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href={`page_${(currentPage + 1).toString()}`} onClick={(e) => handlePageChange(e, currentPage + 1)}>Далее</a>
            </li> : ''
        }
      </ul>
    </div>
  );
}

export default Pagination;
