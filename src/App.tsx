import { useIsAuthenticated } from '@azure/msal-react';
import { LoginPage } from './LoginPage';
import { WelcomePage } from './WelcomePage';
import { useAppInsights } from './useAppInsights';
import { useEffect, useState } from 'react';

function App() {
  useAppInsights();
  const isAuthenticated = useIsAuthenticated();
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Check if required env vars are missing
    const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID;
    const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID;
    
    if (!clientId || !tenantId) {
      console.error('Missing environment variables:', { clientId, tenantId });
      setHasError(true);
    }
  }, []);
  
  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Configuration Error</h2>
        <p>Missing required environment variables. Please check your .env file.</p>
        <p>Required: VITE_ENTRA_CLIENT_ID, VITE_ENTRA_TENANT_ID</p>
      </div>
    );
  }
  
  if (isAuthenticated === undefined) {
    return <div>Loading authentication status...</div>;
  }
  
  return isAuthenticated ? <WelcomePage /> : <LoginPage />;
}

export default App;
