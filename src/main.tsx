import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorBoundary } from './ErrorBoundary';
import { MSALAppProvider } from './MSALAppProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MSALAppProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MSALAppProvider>
  </StrictMode>
);
