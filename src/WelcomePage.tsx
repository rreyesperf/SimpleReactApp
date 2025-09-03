import { useMsal } from '@azure/msal-react';

export function WelcomePage() {
  const { accounts, instance } = useMsal();
  const user = accounts[0];

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
      <h2>Welcome, {user?.name || user?.username || 'User'}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
