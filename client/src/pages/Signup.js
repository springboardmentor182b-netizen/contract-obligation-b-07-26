import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../features/authentication/services/signup';
import './FigmaAuth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        full_name: `${formData.first_name} ${formData.last_name}`
      };
      await signup(signupData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="figma-auth-container">
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
            <li>
              <span className="feature-icon">👥</span>
              <span>Role-based access control</span>
            </li>
          </ul>

          <div className="access-roles-section">
            <h3>ACCESS ROLES</h3>
            <div className="role-badges">
              <span className="role-badge">Administrator</span>
              <span className="role-badge">Legal Manager</span>
              <span className="role-badge">Compliance Officer</span>
              <span className="role-badge">Contract Manager</span>
              <span className="role-badge">Department Head</span>
              <span className="role-badge employee">Employee</span>
            </div>
          </div>

          <div className="figma-footer-info">
            <p>🔒 Secure by JWT · Authentication · RBAC</p>
          </div>
        </div>
      </div>

      <div className="figma-right-panel">
        <div className="figma-auth-box">
          <div className="figma-auth-header">
            <h2>Create account</h2>
            <p>Join your organization on ContractIQ</p>
          </div>

          <div className="figma-tabs">
            <Link to="/login" className="figma-tab">Sign In</Link>
            <button className="figma-tab active">Register</button>
          </div>

          <div className="figma-badges">
            <span className="security-badge">🔐 JWT Secured</span>
            <span className="security-badge">🔒 256-bit HTTPS encryption</span>
          </div>

          {error && <div className="figma-error">{error}</div>}

          <form onSubmit={handleSignup} className="figma-form">
            <div className="figma-form-group">
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

            <div className="figma-form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="e.g. Thomson"
                required
              />
            </div>

            <div className="figma-form-group">
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

            <div className="figma-form-group">
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

            <div className="figma-form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </div>

            <button type="submit" className="figma-btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>

            <p className="terms-text">
              By registering, you agree to ContractIQ's terms of service and privacy policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
