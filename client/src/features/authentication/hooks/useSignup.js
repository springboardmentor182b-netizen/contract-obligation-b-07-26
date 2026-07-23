import { useState } from 'react';
import { signup } from '../services/signup';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signupUser = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await signup(userData);
      setSuccess(true);
      return response;
    } catch (err) {
      // Handle different error formats from backend
      let errorMessage = 'Signup failed. Please try again.';
      
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        // If detail is an array (validation errors)
        if (Array.isArray(detail)) {
          errorMessage = detail.map(e => e.msg || e.message).join(', ');
        } else if (typeof detail === 'string') {
          errorMessage = detail;
        } else if (typeof detail === 'object') {
          errorMessage = JSON.stringify(detail);
        }
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signupUser, loading, error, success };
};
