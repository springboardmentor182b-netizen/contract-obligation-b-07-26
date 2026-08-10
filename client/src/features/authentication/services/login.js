import axios from 'axios';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Login response with token and user data
 */
export const login = async (email, password) => {
  const response = await axios.post('/api/auth/login', {
    email,
    password
  });
  return response.data;
};
