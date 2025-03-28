import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

test('renders App', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const elem = screen.getByText(/Corpora/);
  expect(elem).toBeInTheDocument();
});
