import Cart from './cart/cart';
import FormSearch from './form-search/form-search';
import Navigation from './navigation/navigation';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo" href="/#">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </a>
        <Navigation />
        <FormSearch />
        <Cart />
      </div>
    </header>
  );
}

export default Header;
