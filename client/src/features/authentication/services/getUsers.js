import axios from 'axios';

/**
 * Get list of demo users
 * @returns {Promise} - Array of demo users
 */
export const getDemoUsers = async () => {
  const response = await axios.get('/api/demo-users');
  return response.data;
};

/**
 * Get current authenticated user
 * @param {string} token - JWT token
 * @returns {Promise} - Current user data
 */
export const getCurrentUser = async (token) => {
  const response = await axios.get('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
