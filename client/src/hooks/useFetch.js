import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../features/authentication/services/login';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getToken();
        const config = {
          ...options,
          headers: {
            ...options.headers,
            ...(token && { Authorization: `Bearer ${token}` })
          }
        };

        const response = await axios.get(url, config);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};
