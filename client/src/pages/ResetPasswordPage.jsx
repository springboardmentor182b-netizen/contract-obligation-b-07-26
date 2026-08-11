import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ForgotPasswordPage.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  useEffect(() => {
    if (!email || !otp) {
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!Object.values(passwordStrength).every(v => v)) {
      setError('Password does not meet all requirements');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/auth/reset-password', {
        email,
        otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      
      setSuccess('Password reset successfully! Redirecting to login...');
      
      // Clear form
      setFormData({
        newPassword: '',
        confirmPassword: ''
      });

      // Redirect to login
      setTimeout(() => {
        navigate('/login', { state: { message: 'Password reset successfully. Please login with your new password.' } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">ContractIQ</span>
        </div>

        <h1 className="title">Create New Password</h1>
        <p className="subtitle">Choose a strong password to secure your account.</p>

        <div className="features">
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>Minimum 8 characters</span>
          </div>
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>Mix of letters and numbers</span>
          </div>
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>Unique and memorable</span>
          </div>
          <div className="feature-item">
            <span className="icon">🔒</span>
            <span>Securely encrypted</span>
          </div>
        </div>

        <div className="footer">
          <p>© Secured by JWT · Authentication · Help</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="auth-container">
          <h2 className="auth-title">New<br />Password</h2>
          <p className="auth-subtitle">Enter your new password below</p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>New Password *</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <small>Minimum 8 characters</small>
            </div>

            <div className="password-requirements">
              <div className={`requirement ${passwordStrength.hasMinLength ? 'valid' : ''}`}>
                {passwordStrength.hasMinLength ? '✓' : '○'} At least 8 characters
              </div>
              <div className={`requirement ${passwordStrength.hasUpperCase ? 'valid' : ''}`}>
                {passwordStrength.hasUpperCase ? '✓' : '○'} Uppercase letter (A-Z)
              </div>
              <div className={`requirement ${passwordStrength.hasLowerCase ? 'valid' : ''}`}>
                {passwordStrength.hasLowerCase ? '✓' : '○'} Lowercase letter (a-z)
              </div>
              <div className={`requirement ${passwordStrength.hasNumber ? 'valid' : ''}`}>
                {passwordStrength.hasNumber ? '✓' : '○'} Number (0-9)
              </div>
              <div className={`requirement ${passwordStrength.hasSpecialChar ? 'valid' : ''}`}>
                {passwordStrength.hasSpecialChar ? '✓' : '○'} Special character (!@#$%...)
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password →'}
            </button>

            <p className="back-to-login">
              Remember your password? <a href="/login">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
