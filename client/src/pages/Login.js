import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAnalytics } from '../components/context/AnalyticsContext';
import { login } from '../features/authentication/services/login';
import './FigmaAuth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login: loginContext } = useAnalytics();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);
      loginContext(response.user, response.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="figma-auth-container">
      {/* Left Sidebar */}
      <div className="figma-left-panel">
        <div className="figma-brand">
          <div className="figma-logo">C</div>
          <h1>ContractIQ</h1>
          <p className="figma-tagline">Full-Stack Application</p>
        </div>

        <div className="figma-features">
          <h2>Contract Obligation Management Platform</h2>
          <p className="figma-subtitle">Secure, compliant, and role-based access to your entire contract lifecycle.</p>
          
          <ul className="figma-feature-list">
            <li>
              <span className="feature-icon">📄</span>
              <span>Contract lifecycle management</span>
            </li>
            <li>
              <span className="feature-icon">✓</span>
              <span>Compliance monitoring & reporting</span>
            </li>
            <li>
              <span className="feature-icon">⚡</span>
              <span>Obligation tracking & alerts</span>
            </li>
            <li>
              <span className="feature-icon">📊</span>
              <span>Real-time analytics & insights</span>
            </li>
            <li>
              <span className="feature-icon">🔐</span>
              <span>JWT-secured authentication</span>
            </li>

          <div className="figma-footer-info">
            <p>🔒 Secure by JWT · Authentication · RBAC</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="figma-right-panel">
        <div className="figma-auth-box">
          <div className="figma-auth-header">
            <h2>Welcome back</h2>
            <p>Sign in to your ContractIQ workspace.</p>
          </div>

          <div className="figma-tabs">
            <button className="figma-tab active">Sign In</button>
            <Link to="/signup" className="figma-tab">Register</Link>
          </div>

          <div className="figma-badges">
            <span className="security-badge">🔐 JWT Secured</span>
            <span className="security-badge">🔒 256-bit HTTPS encryption</span>
          </div>

          {error && <div className="figma-error">{error}</div>}

          <form onSubmit={handleLogin} className="figma-form">
            <div className="figma-form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="figma-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <a href="#" className="figma-forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="figma-btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="figma-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
