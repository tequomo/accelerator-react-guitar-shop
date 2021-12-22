import Breadcrumbs from '../layout/breadcrumbs/breadcrumbs';
import Catalog from '../layout/catalog/catalog';
import Footer from '../layout/footer/footer';
import Header from '../layout/header/header';

function MainPage(): JSX.Element {
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
