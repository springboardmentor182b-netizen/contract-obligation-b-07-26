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
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signupUser, loading, error, success };
};
