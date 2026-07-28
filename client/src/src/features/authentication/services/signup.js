import axios from 'axios';
import { API_BASE_URL } from '../../../data/constants';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password
      // Role will be auto-assigned as "Employee" by backend
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
