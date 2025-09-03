// Replace with your own Entra (Azure AD) app registration values
const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID;
const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID;

if (!clientId || !tenantId) {
  console.error('Missing required environment variables:');
  console.error('VITE_ENTRA_CLIENT_ID:', clientId);
  console.error('VITE_ENTRA_TENANT_ID:', tenantId);
}

export const msalConfig = {
  auth: {
    clientId: clientId || '',
    authority: `https://login.microsoftonline.com/${tenantId || 'common'}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};
