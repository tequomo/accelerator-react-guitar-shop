/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { AppRoute, CARDS_PER_PAGE, urlPaginationParams } from '../../../const';
import useQuery from '../../../hooks/use-query';
import { fetchGuitarsAction } from '../../../services/api-actions';
import { setCurrentPage } from '../../../store/action';
import { getCurrentPage, getTotalCountGuitars } from '../../../store/reducers/app-state/selectors';

type PageServingType = {
  start: number,
  end: number,
}

type ParamsPropsType = {
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

  const [pageServing, setPageServing] = useState<PageServingType>(initPageServing);

  const handlePrevPageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handlePageChange = (evt: MouseEvent<HTMLAnchorElement>, page: number) => {
    evt.preventDefault();
    dispatch(setCurrentPage(page));
  };

  const handleNextPageClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage + 1));
  };

  useEffect(() => {
    history.push({
      pathname: `${AppRoute.GuitarQuery}/page_${currentPage}`,
      search: search,
    });
  }, [currentPage, history, search]);

  // useEffect(() => {
  //   console.log(search);
  //   console.log(pageNumber);
  //   dispatch(setCurrentPage(+pageNumber));
  // }, [dispatch, pageNumber, search]);


  const composeQuery = useCallback((page: string): string => {
    setPageServing((state) => ({
      ...state,
      start: (+page - 1) * CARDS_PER_PAGE,
      end: ((+page * CARDS_PER_PAGE) - 1 < totalCountGuitars) ? +page * CARDS_PER_PAGE : totalCountGuitars -1,
    }));
    const paginationQuery = `${urlPaginationParams.Start}=${pageServing.start}&${urlPaginationParams.End}=${pageServing.end}`;
    return paginationQuery;
  }, [pageServing, totalCountGuitars]);

  useEffect(() => {
    const start = (+queryPageNumber - 1) * CARDS_PER_PAGE;
    const end = (((+queryPageNumber * CARDS_PER_PAGE) < totalCountGuitars) ? (+queryPageNumber * CARDS_PER_PAGE) : totalCountGuitars);

    const paginationQuery = `${search ? `${search}&` : '?'}${urlPaginationParams.Start}=${start}&${urlPaginationParams.End}=${end}`;
    // console.log(pageNumber);
    // const query = composeQuery(pageNumber);
    dispatch(fetchGuitarsAction(paginationQuery));
    // history.push({
    //   pathname: AppRoute.GuitarQuery,
    //   search: `page_${currentPage}search`,
    // });
    // console.log(composeQuery());
  }, [dispatch, queryPageNumber, search, totalCountGuitars]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          +queryPageNumber !== Math.min(...totalPagesList) ?
            <li className="pagination__page pagination__page--prev" id="prev">
              <a className="link pagination__page-link" href={`page_${(currentPage - 1).toString()}`} onClick={handlePrevPageClick}>Назад</a>
            </li> : ''
        }
        {
          totalPagesList
            .map((page) =>(
              <li key={`page_${page}`} className={`pagination__page${currentPage === page ? ' pagination__page--active' : ''}`}>
                <a className="link pagination__page-link" href={`page_${page.toString()}`} onClick={(e) => handlePageChange(e, page)}>{page}</a>
              </li>
            ),
            )
        }
        {
          +queryPageNumber !== Math.max(...totalPagesList) ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href={`page_${(currentPage + 1).toString()}`} onClick={handleNextPageClick}>Далее</a>
            </li> : ''
        }
      </ul>
    </div>
  );
}

export default Pagination;
