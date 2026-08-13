import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../utils/api";

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check for token in URL (OAuth callback)
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      api.setToken(tokenFromUrl);
      // Remove token from URL
      window.history.replaceState({}, document.title, '/home');
    }

    const fetchUser = async () => {
      try {
        const userData = await api.getMe();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, searchParams]);

  const handleLogout = () => {
    api.removeToken();
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <h1>Welcome, {user?.username}!</h1>
      <p>Email: {user?.email}</p>
      <p>User ID: {user?.id}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
