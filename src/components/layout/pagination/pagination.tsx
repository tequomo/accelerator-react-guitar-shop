/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from 'react-redux';
import { CARDS_PER_PAGE } from '../../../const';
import { getTotalCountGuitars } from '../../../store/reducers/app-state/selectors';

function Pagination(): JSX.Element {

  const totalCountGuitars = useSelector(getTotalCountGuitars);

  const totalPages = Math.ceil(totalCountGuitars / CARDS_PER_PAGE);


  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--prev" id="prev"><a className="link pagination__page-link" href="2">Назад</a>
        </li>
        <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
        </li>
        <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
        </li>
        <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
        </li>
        <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
