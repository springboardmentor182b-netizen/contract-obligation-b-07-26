import axios from 'axios';

export const getUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default getUsers;
