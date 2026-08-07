import { useState } from 'react';
import { login } from '../services/login';

/**
 * Custom hook for login functionality
 * @returns {Object} - Login state and handler
 */
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await login(email, password);
      setSuccess('Login successful!');
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, success, setError, setSuccess };
};
