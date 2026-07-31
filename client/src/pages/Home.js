import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../components/context/AnalyticsContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAnalytics();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to ContractIQ</h1>
      <p>Hello, {user?.full_name || user?.email}!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
