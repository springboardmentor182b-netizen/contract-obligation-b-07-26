import axios from 'axios';

/**
 * Register new user account
 * @param {Object} userData - User registration data
 * @param {string} userData.firstName - User first name
 * @param {string} userData.lastName - User last name
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @returns {Promise} - Registration response with token and user data
 */
export const signup = async (userData) => {
  const response = await axios.post('/api/auth/register', {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password
  });
  return response.data;
};
