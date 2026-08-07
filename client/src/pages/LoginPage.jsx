import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin');
  const [demoUsers, setDemoUsers] = useState([]);
  
  // Sign In form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDemoUsers();
  }, []);

  const fetchDemoUsers = async () => {
    try {
      const response = await axios.get('/api/demo-users');
      setDemoUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch demo users:', err);
    }
  };

  const handleSignInChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', signInData);
      setSuccess('Login successful!');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation - only check if passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        password: registerData.password
      });
      
      setSuccess('Account created successfully!');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to dashboard immediately
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      const errorMessage = err.response?.data?.detail;
      
      if (typeof errorMessage === 'string') {
        setError(errorMessage);
      } else if (Array.isArray(errorMessage) && errorMessage[0]?.msg) {
        setError(errorMessage[0].msg);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">ContractIQ</span>
        </div>

        <h1 className="title">Contract Obligation<br />Management Platform</h1>
        <p className="subtitle">Oversee, categorize, and track-based threats for your entire contract lifecycle.</p>

        <div className="features">
          <div className="feature-item">
            <span className="icon">📋</span>
            <span>Contract lifecycle management</span>
          </div>
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>Compliance monitoring & reporting</span>
          </div>
          <div className="feature-item">
            <span className="icon">⚠️</span>
            <span>Obligation tracking & alerts</span>
          </div>
          <div className="feature-item">
            <span className="icon">📊</span>
            <span>Real-time analytics & insights</span>
          </div>
          <div className="feature-item">
            <span className="icon">🔒</span>
            <span>JWT-secured authentication</span>
          </div>
          <div className="feature-item">
            <span className="icon">👥</span>
            <span>Role-based access control</span>
          </div>
        </div>

        <div className="demo-roles">
          <h3>ACCESS ROLES</h3>
          <div className="role-badges">
            <span className="role-badge">Administrator</span>
            <span className="role-badge">Legal Manager</span>
            <span className="role-badge">Compliance Officer</span>
            <span className="role-badge">Contract Manager</span>
            <span className="role-badge">Department Head</span>
            <span className="role-badge">Employee</span>
          </div>
        </div>

        <div className="footer">
          <p>© Secured by JWT · Authentication · Help</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="auth-container">
          <h2 className="auth-title">
            {activeTab === 'signin' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="auth-subtitle">
            {activeTab === 'signin' 
              ? 'Sign in to your ContractIQ workspace' 
              : 'Get your organization on ContractIQ'}
          </p>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('signin');
                setError('');
                setSuccess('');
              }}
            >
              Sign In
            </button>
            <button
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('register');
                setError('');
                setSuccess('');
              }}
            >
              Register
            </button>
          </div>

          <div className="sso-buttons">
            <button className="sso-btn jwt-badge">
              <span className="sso-icon">🔐</span> JWT Secured
            </button>
            <button className="sso-btn https-badge">
              <span className="sso-icon">🔒</span> 256-bit HTTPS encryption
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {activeTab === 'signin' ? (
            <form onSubmit={handleSignIn} className="auth-form">
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="m028.2Abrams4@gmail.com"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  required
                />
                <a href="/forgot-password" className="forgot-password">Forgot password?</a>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in →'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="e.g. Alexandra"
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="e.g. Thompson"
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Work Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="m028.2Abrams4@gmail.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account →'}
              </button>

              <p className="terms">
                By registering you agree to ContractIQ's terms of service and privacy policy.
              </p>
            </form>
          )}

          {activeTab === 'signin' && demoUsers.length > 0 && (
            <div className="demo-users">
              <h4>DEMO ACCESS</h4>
              <div className="demo-grid">
                {demoUsers.map((user, index) => (
                  <div key={index} className="demo-user">
                    <div className="demo-role">{user.role}</div>
                    <div className="demo-email">{user.email}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
