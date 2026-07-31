import axios from 'axios';
import { API_ENDPOINTS } from '../../../config/api';

export const signup = async (userData) => {
  const response = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
  return response.data;
};
