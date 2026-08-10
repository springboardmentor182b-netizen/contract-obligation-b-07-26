import axios from 'axios';

/**
 * Request password reset OTP
 * @param {string} email - User email
 * @returns {Promise} - Response with message
 */
export const requestPasswordReset = async (email) => {
  const response = await axios.post('/api/auth/forgot-password', { email });
  return response.data;
};

/**
 * Verify OTP code
 * @param {string} email - User email
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise} - Verification response
 */
export const verifyOTP = async (email, otp) => {
  const response = await axios.post('/api/auth/verify-otp', { email, otp });
  return response.data;
};

/**
 * Reset password with OTP
 * @param {Object} data - Reset password data
 * @param {string} data.email - User email
 * @param {string} data.otp - 6-digit OTP code
 * @param {string} data.newPassword - New password
 * @param {string} data.confirmPassword - Confirm new password
 * @returns {Promise} - Reset response
 */
export const resetPassword = async (data) => {
  const response = await axios.post('/api/auth/reset-password', data);
  return response.data;
};
