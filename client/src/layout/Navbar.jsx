import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">ContractIQ</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <span className="user-name">{user?.firstName} {user?.lastName}</span>
          <span className="user-role">{user?.role}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
