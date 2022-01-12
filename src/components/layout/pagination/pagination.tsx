/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CARDS_PER_PAGE } from '../../../const';
import useQuery from '../../../hooks/use-query';
import { getTotalCountGuitars } from '../../../store/reducers/app-state/selectors';

type PageServingType = {
  start: number,
  end: number,
}

function Pagination(): JSX.Element {

  const queryString = useQuery();
  const totalCountGuitars = useSelector(getTotalCountGuitars);
  const initCurrentPage = 1;
  const initPageServing: PageServingType = {
    start: 0,
    end: CARDS_PER_PAGE - 1,
  };

  const totalPagesCount = Math.ceil(totalCountGuitars / CARDS_PER_PAGE);
  const totalPages: number[] = new Array(totalPagesCount).fill(false).map((_page, idx) => idx + 1);
  const [currentPage, setCurrentPage] = useState<number>(initCurrentPage);
  const [pageServing, setPageServing] = useState<PageServingType>(initPageServing);


  const handlePageChange = (evt: MouseEvent<HTMLAnchorElement>, page: number) => {
    evt.preventDefault();
    setCurrentPage(() => page);
    console.log(currentPage);
  };

  // useEffect(() => {

  // });

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          currentPage !== initCurrentPage ?
            <li className="pagination__page pagination__page--prev" id="prev">
              <a className="link pagination__page-link" href="2" onClick={(e) => handlePageChange(e, currentPage - 1)}>Назад</a>
            </li> : ''
        }
        {
          totalPages
            .map((page) =>(
              <li key={`page_${page}`} className={`pagination__page${currentPage === page ? ' pagination__page--active' : ''}`}>
                <a className="link pagination__page-link" href="1" onClick={(e) => handlePageChange(e, page)}>{page}</a>
              </li>
            ),
            )
        }
        {
          currentPage !== Math.max(...totalPages) ?
            <li className="pagination__page pagination__page--next" id="next">
              <a className="link pagination__page-link" href="2" onClick={(e) => handlePageChange(e, currentPage + 1)}>Далее</a>
            </li> : ''
        }
      </ul>
    </div>
  );
}

export default Pagination;
