import axios from 'axios';

export const login = async (credentials) => {
  try {
    const response = await axios.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default login;
