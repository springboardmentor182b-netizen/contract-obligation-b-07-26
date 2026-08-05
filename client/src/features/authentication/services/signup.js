import axios from 'axios';

export const signup = async (userData) => {
  try {
    const response = await axios.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default signup;
