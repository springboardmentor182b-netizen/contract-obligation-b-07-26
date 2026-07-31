import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};
