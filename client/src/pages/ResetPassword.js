import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetCode } = location.state || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if no email/code
  React.useEffect(() => {
    if (!email || !resetCode) {
      navigate('/forgot-password');
    } else {
      console.log('Reset password page loaded with:', { email, resetCode });
    }
  }, [email, resetCode, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Sending reset request:', { email, reset_code: resetCode });

    setLoading(true);
    try {
      const response = await axios.post('/reset-password', {
        email,
        reset_code: resetCode,
        new_password: newPassword
      });
      
      alert('Password reset successfully! You can now login with your new password.');
      navigate('/login');
    } catch (err) {
      console.error('Reset password error:', err);
      console.error('Error response:', err.response);
      
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to reset password';
      setError(errorMsg);
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
            <h2>Create New Password</h2>
            <p>Choose a strong password to secure your account.</p>

            <ul className="feature-list">
              <li>
                <span className="feature-icon">✓</span>
                <span>Minimum 8 characters</span>
              </li>
              <li>
                <span className="feature-icon">✓</span>
                <span>Mix of letters and numbers</span>
              </li>
              <li>
                <span className="feature-icon">✓</span>
                <span>Unique and memorable</span>
              </li>
              <li>
                <span className="feature-icon">🔒</span>
                <span>Securely encrypted</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="auth-footer">
          <span>🔒</span>
          <span>Your security is our priority</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2>New Password</h2>
            <p>Enter your new password below.</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="auth-form" onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>New Password *</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <small>Minimum 8 characters</small>
            </div>

            <div className="form-group">
              <label>Confirm New Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Resetting Password...' : 'Reset Password →'}
            </button>
          </form>

          <div className="auth-footer-text" style={{ marginTop: '24px' }}>
            Remember your password? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
