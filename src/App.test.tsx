import React from 'react';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

test('renders welcome message', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const elem = screen.getByText(/Welcome to EcoCor/i);
  expect(elem).toBeInTheDocument();
});
