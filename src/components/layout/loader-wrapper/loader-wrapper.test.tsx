import { render, screen } from '@testing-library/react';
import LoaderWrapper from './loader-wrapper';

describe('Component: LoaderWrapper', () => {
  it('should render Loader correctly', () => {
    render(
      <LoaderWrapper isLoad={false} >
        <h1>This is a children element</h1>
      </LoaderWrapper>,
    );

    expect(screen.queryByText(/This is a children element/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render children element correctly', () => {
    render(
      <LoaderWrapper isLoad >
        <h1>This is a children element</h1>
      </LoaderWrapper>,
    );

    expect(screen.getByText(/This is a children element/i)).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
