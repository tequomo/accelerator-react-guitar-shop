import {render, screen} from '@testing-library/react';
// import App from './app';

test('Renders app-component', () => {
  render(<p>Hello, world!</p>);
  const textElement = screen.getByText(/Hello, world!/i);
  expect(textElement).toBeInTheDocument();
});
