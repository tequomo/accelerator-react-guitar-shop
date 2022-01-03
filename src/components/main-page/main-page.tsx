// import {useEffect, useMemo} from 'react';
// import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../layout/breadcrumbs/breadcrumbs';
import Catalog from '../layout/catalog/catalog';
import Footer from '../layout/footer/footer';
import Header from '../layout/header/header';

// const params = [
//   'price_gte',
//   'price_lte',
//   'type',
//   'stringCount',
// ];
// function useQuery() {
//   const { search } = useLocation();
//   // eslint-disable-next-line no-console
//   console.log(search);
//   return useMemo(() => new URLSearchParams(search), [search]);
// }

function MainPage(): JSX.Element {
  // const query = useQuery();
  // useEffect(() => {
  //   const queryParams: {[key:string]: string[] | null} = {};
  //   params.forEach((p) => {
  //     const value = query.getAll(p);
  //     if(value) {
  //       queryParams[p] = value;
  //     }
  //   });
  //   // eslint-disable-next-line no-console
  //   console.log('queryParams', queryParams);
  // }, [query]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <Catalog />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
