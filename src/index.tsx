import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

const { VITE_MOCK_API } = import.meta.env;

if (VITE_MOCK_API === 'yes') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { worker } = require('./mocks/browser');
  worker.start();
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
