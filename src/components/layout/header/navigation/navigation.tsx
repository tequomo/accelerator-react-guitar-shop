/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { AppRoute } from '../../../../const';

function Navigation(): JSX.Element {

  const currentRoute = useRouteMatch();

  const isCatalog = (currentRoute.path === `${AppRoute.GuitarQuery}${AppRoute.CatalogPage}`) || (currentRoute.path === AppRoute.Main);

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li><Link className={`link main-nav__link${isCatalog ? ' link--current' : ''}`} to={AppRoute.Main}>Каталог</Link>
        </li>
        <li><Link className="link main-nav__link" to={'/#'}>Где купить?</Link>
        </li>
        <li><Link className="link main-nav__link" to={'/#'}>О компании</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
