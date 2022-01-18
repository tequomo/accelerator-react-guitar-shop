import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { getFakeGuitar } from '../../../utils/mock';
import GuitarContainer from './guitar-container';

const history = createMemoryHistory();
const guitar = getFakeGuitar();

describe('Component: GuitarContainer', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <GuitarContainer guitar={guitar}/>
      </Router>,
    );

    expect(screen.getByAltText(guitar.name)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(guitar.name);
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
  });

});
