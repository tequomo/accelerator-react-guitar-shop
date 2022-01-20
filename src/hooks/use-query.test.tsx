import { AppRoute } from '../const';
import { renderHook } from '@testing-library/react-hooks';
import useQuery from './use-query';
import { FC } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Component: useQuery', () => {
  it('returns values from url query', () => {

    const wrapper: FC = ({ children }) => (
      <MemoryRouter initialEntries={[`${AppRoute.GuitarQuery}?type=ukulele&_sort=price&_order=asc`]}>
        <Route path="*" />
        {children}
      </MemoryRouter>
    );

    const { result: { current } } = renderHook(() => useQuery(), { wrapper });

    expect(current.has('type')).toBe(true);
    expect(current.get('type')).toBe('ukulele');
    expect(current.has('_order')).toBe(true);
    expect(current.get('_order')).not.toBe('desc');
    expect(current.has('_sort')).toBe(true);
    expect(current.get('_sort')).toBe('price');
  });

});
