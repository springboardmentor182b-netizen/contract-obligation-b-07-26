import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/forgot-password', { email });
      
      if (response.data.reset_code) {
        alert(`Demo Mode: Your reset code is ${response.data.reset_code}`);
        setResetCode(response.data.reset_code);
      }
      
      setMessage(response.data.message || 'Reset code sent to your email');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!resetCode) {
      setError('Please enter the reset code');
      return;
    }
    navigate('/reset-password', { state: { email, resetCode } });
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
            <h2>Reset Password</h2>
            <p>We'll send you a code to reset your password securely.</p>

            <ul className="feature-list">
              <li>
                <span className="feature-icon">✓</span>
                <span>Secure verification code</span>
              </li>
              <li>
                <span className="feature-icon">✓</span>
                <span>Valid for 15 minutes</span>
              </li>
              <li>
                <span className="feature-icon">✓</span>
                <span>One-time use only</span>
              </li>
              <li>
                <span className="feature-icon">🔒</span>
                <span>Your security matters</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="auth-footer">
          <span>🔒</span>
          <span>Secure password recovery</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          {step === 1 ? (
            <>
              <div className="auth-form-header">
                <h2>Forgot Password</h2>
                <p>Enter your email to receive a reset code</p>
              </div>

              {error && <div className="error-message">{error}</div>}
              {message && <div className="success-message">{message}</div>}

              <form className="auth-form" onSubmit={handleSendCode}>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  <small>We'll send a 6-digit code to this email</small>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Sending Code...' : 'Send Reset Code →'}
                </button>
              </form>

              <div className="auth-footer-text" style={{ marginTop: '24px' }}>
                Remember your password? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Sign In</a>
              </div>
            </>
          ) : (
            <>
              <div className="auth-form-header">
                <h2>Enter Code</h2>
                <p>Enter the 6-digit code sent to {email}</p>
              </div>

              {error && <div className="error-message">{error}</div>}

              <form className="auth-form" onSubmit={handleVerifyCode}>
                <div className="form-group">
                  <label>Reset Code *</label>
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    required
                  />
                  <small>Check your email for the code</small>
                </div>

                <button type="submit" className="submit-button">
                  Verify Code →
                </button>
              </form>

              <div className="auth-footer-text" style={{ marginTop: '24px' }}>
                Didn't receive code? <a href="#" onClick={(e) => { e.preventDefault(); setStep(1); setError(''); }}>Resend Code</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
