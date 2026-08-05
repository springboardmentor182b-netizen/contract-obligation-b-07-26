import { useState } from 'react';
import { signup } from '../services/signup';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSignup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await signup(userData);
      setData(result);
      return result;
    } catch (err) {
      setError(err.detail || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading, error, data };
};

export default useSignup;
