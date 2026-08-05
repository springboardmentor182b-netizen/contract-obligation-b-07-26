import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/login', {
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/signup', {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name
      });
      
      alert('Account created successfully! Please login.');
      setActiveTab('signin');
      setFormData({ email: formData.email, password: '', first_name: '', last_name: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Panel */}
      <div className="auth-left-panel">
        <div>
          <div className="auth-logo">
            <div className="auth-logo-circle">C</div>
            <div className="auth-logo-text">
              <h1>ContractIQ</h1>
              <p>Full Stack Application</p>
            </div>
          </div>

          <div className="auth-content">
            <h2>Contract Obligation Management Platform</h2>
            <p>Secure, compliant, and role-based access to your entire contract lifecycle.</p>

            <ul className="feature-list">
              <li>
                <span className="feature-icon">📋</span>
                <span>Contract lifecycle management</span>
              </li>
              <li>
                <span className="feature-icon">✓</span>
                <span>Compliance monitoring & reporting</span>
              </li>
              <li>
                <span className="feature-icon">⚠️</span>
                <span>Obligation tracking & alerts</span>
              </li>
              <li>
                <span className="feature-icon">📊</span>
                <span>Real-time analytics & insights</span>
              </li>
              <li>
                <span className="feature-icon">🔒</span>
                <span>JWT-secured authentication</span>
              </li>
              <li>
                <span className="feature-icon">👥</span>
                <span>Role-based access control</span>
              </li>
            </ul>

        <div className="auth-footer">
          <span>🔒</span>
          <span>Secure by JWT · Authentication · RBAC</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>{activeTab === 'signin' ? 'Welcome back' : 'Create account'}</h2>
            <p>{activeTab === 'signin' ? 'Sign in to your ContractIQ workspace.' : 'Join your organization on ContractIQ.'}</p>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => { setActiveTab('signin'); setError(''); }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveTab('register'); setError(''); }}
            >
              Register
            </button>
          </div>

          {/* Security Badges */}
          <div className="security-badges">
            <span className="security-badge jwt">
              <span>🔒</span>
              <span>JWT Secured</span>
            </span>
            <span className="security-badge https">
              <span>🔐</span>
              <span>256-bit HTTPS encryption</span>
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jacar@test.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="/forgot-password" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign in →'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form className="auth-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="e.g. Alexandra"
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="e.g. Thompson"
                  required
                />
              </div>

              <div className="form-group">
                <label>Work Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                />
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>

              <p className="terms-text">
                By registering, you agree to ContractIQ's <a href="#">terms of service</a> and <a href="#">privacy policy</a>.
              </p>
            </form>
          )}
            
        </div>
      </div>
    </div>
  );
};

export default Login;
