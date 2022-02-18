import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { StarRatingOrigin } from '../../../const';
import StarRating from './star-rating';

const history = createMemoryHistory();
const rating = datatype.number();

describe('Component: StarRating', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <StarRating rating={rating} origin={StarRatingOrigin.Card}/>
      </Router>,
    );

    expect(screen.getAllByTestId('star')[0]).toBeInTheDocument();
  });

});
