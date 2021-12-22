function Navigation(): JSX.Element {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li><a className="link main-nav__link link--current" href="/#">Каталог</a>
        </li>
        <li><a className="link main-nav__link" href="/#">Где купить?</a>
        </li>
        <li><a className="link main-nav__link" href="/#">О компании</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
