/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppRoute, CARDS_PER_PAGE, urlPaginationParams } from '../../../const';
import useQuery from '../../../hooks/use-query';
import { getTotalCountGuitars } from '../../../store/reducers/app-state/selectors';

type PageServingType = {
  start: number,
  end: number,
}

function Pagination(): JSX.Element {

  const history = useHistory();
  const queryString = useQuery();
  const { search } = useLocation();
  const totalCountGuitars = useSelector(getTotalCountGuitars);
  const initCurrentPage = 1;
  const initPageServing: PageServingType = {
    start: 0,
    end: CARDS_PER_PAGE - 1,
  };

  const totalPagesCount = Math.ceil(totalCountGuitars / CARDS_PER_PAGE);
  const totalPagesList: number[] = new Array(totalPagesCount).fill(false).map((_page, idx) => idx + 1);

  const [currentPage, setCurrentPage] = useState<number>(initCurrentPage);
  const [pageServing, setPageServing] = useState<PageServingType>(initPageServing);


  const handlePageChange = (evt: MouseEvent<HTMLAnchorElement>, page: number) => {
    evt.preventDefault();
    setCurrentPage(page);
    // console.log('function=', currentPage);
  };

  useEffect(() => {
    console.log('effect=', currentPage);

    // if(currentPage !== initCurrentPage) {
    setPageServing((state) => ({
      ...state,
      start: (currentPage - 1) * CARDS_PER_PAGE,
      end: ((currentPage * CARDS_PER_PAGE) - 1 < totalCountGuitars) ? currentPage * CARDS_PER_PAGE : totalCountGuitars -1,
    }));
    // }
  }, [currentPage, totalCountGuitars]);
  console.log(pageServing);

  useEffect(() => {
    const composeQuery = () => {
      const paginationQuery = `${urlPaginationParams.Start}=${pageServing.start}&${urlPaginationParams.End}=${pageServing.end}`;
      return paginationQuery;
    };
    // history.push({
    //   pathname: AppRoute.GuitarQuery,
    //   search: `page_${currentPage}search`,
    // });
    console.log(composeQuery());
  }, [pageServing]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          currentPage !== initCurrentPage ?
            <li className="pagination__page pagination__page--prev" id="prev">
              <a className="link pagination__page-link" href={(currentPage - 1).toString()} onClick={(e) => handlePageChange(e, currentPage - 1)}>Назад</a>
            </li> : ''
        }
        {
          totalPagesList
            .map((page) =>(
              <li key={`page_${page}`} className={`pagination__page${currentPage === page ? ' pagination__page--active' : ''}`}>
                <a className="link pagination__page-link" href={page.toString()} onClick={(e) => handlePageChange(e, page)}>{page}</a>
              </li>
            ),
            )
        }
        {
          currentPage !== Math.max(...totalPagesList) ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href={(currentPage + 1).toString()} onClick={(e) => handlePageChange(e, currentPage + 1)}>Далее</a>
            </li> : ''
        }
      </ul>
    </div>
  );
}

export default Pagination;
