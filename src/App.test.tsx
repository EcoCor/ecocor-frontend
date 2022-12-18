import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

test('renders site title', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const elem = screen.getByText(/EcoCor/);
  expect(elem).toBeInTheDocument();
});
