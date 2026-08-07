import { useState } from 'react';
import { signup } from '../services/signup';

/**
 * Custom hook for signup functionality
 * @returns {Object} - Signup state and handler
 */
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (userData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await signup(userData);
      setSuccess('Account created successfully!');
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.detail;
      
      // Parse validation errors
      let finalError;
      if (typeof errorMessage === 'object' && errorMessage[0]?.msg) {
        finalError = errorMessage[0].msg;
      } else if (typeof errorMessage === 'string') {
        finalError = errorMessage;
      } else {
        finalError = 'Registration failed. Please check your password meets all requirements.';
      }
      
      setError(finalError);
      return { success: false, error: finalError };
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading, error, success, setError, setSuccess };
};
