import { Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import CartPage from '../cart-page/cart-page';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import ProductPage from '../product-page/product-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainPage />
      </Route>
      <Route exact path={AppRoute.Product}>
        <ProductPage />
      </Route>
      <Route exact path={AppRoute.Cart}>
        <CartPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
