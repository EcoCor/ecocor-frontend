import { renderWithRouter } from './testHelpers';
import App from './App';

test.skip('renders App', () => {
  const { getByText } = renderWithRouter('/', () => <App />);
  expect(getByText(/Corpora/)).toBeDefined();
});
