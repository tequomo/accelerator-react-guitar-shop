import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../layout/footer/footer';
import Header from '../layout/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main style={{position: 'relative', padding: '100px 0 100px'}}>
        <div className="container">
          <div style={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
            <img src='img/content/accordion.png' alt='404'></img>
            <div style={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: '50px'}}>
              <div style={{fontSize: '120px', fontWeight: 'bold', margin: '0', padding: '30px 0 50px', height: '100%'}}>404</div>
              <p style={{margin: '0', padding: '0 0 30px'}}>Страница не найдена.</p>
              <p style={{margin: '0', padding: '0'}}><Link to={AppRoute.Main}>Вернуться на главную.</Link></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>

  );
}

export default NotFoundPage;
