import { useMsal } from '@azure/msal-react';

export function LoginPage() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
      <h2>Login with Microsoft Entra</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
