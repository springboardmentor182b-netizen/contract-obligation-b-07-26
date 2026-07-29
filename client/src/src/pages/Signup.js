import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '../features/authentication/hooks/useSignup';
import './FigmaAuth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { signupUser, loading, error } = useSignup();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await signupUser(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      // Error handled by hook
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
            <li>
              <span className="feature-icon">👥</span>
              <span>Role-based access control</span>
            </li>
          </ul>

          <div className="figma-access-roles">
            <p className="access-label">ACCESS ROLES</p>
            <div className="role-tags">
              <span className="role-tag">Administrator</span>
              <span className="role-tag">Legal Manager</span>
              <span className="role-tag">Compliance Officer</span>
              <span className="role-tag">Contract Manager</span>
              <span className="role-tag">Department Head</span>
              <span className="role-tag">Employee</span>
            </div>
          </div>

          <div className="figma-footer-info">
            <p>🔒 Secure by JWT · Authentication · RBAC</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="figma-right-panel">
        <div className="figma-auth-box">
          <div className="figma-auth-header">
            <h2>Create account</h2>
            <p>Join your organization on ContractIQ.</p>
          </div>

          <div className="figma-tabs">
            <Link to="/login" className="figma-tab">Sign In</Link>
            <button className="figma-tab active">Register</button>
          </div>

          <div className="figma-badges">
            <span className="security-badge">🔐 JWT Secured</span>
            <span className="security-badge">🔒 256-bit HTTPS encryption</span>
          </div>

          {success && (
            <div style={{background: '#f0fdf4', color: '#15803d', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px'}}>
              Account created successfully! Redirecting to login...
            </div>
          )}

          {error && <div className="figma-error">{error}</div>}

          <form onSubmit={handleSignup} className="figma-form">
            <div className="figma-form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. Alexandra"
                required
              />
            </div>

            <div className="figma-form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
              {errors.password && <small style={{color: '#dc2626', fontSize: '12px'}}>{errors.password}</small>}
            </div>

            <div className="figma-form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
              {errors.confirmPassword && <small style={{color: '#dc2626', fontSize: '12px'}}>{errors.confirmPassword}</small>}
            </div>

            <button type="submit" className="figma-btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>

            <p style={{fontSize: '12px', color: '#64748b', marginTop: '16px', textAlign: 'center'}}>
              By registering, you agree to ContractIQ's terms of service and privacy policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
