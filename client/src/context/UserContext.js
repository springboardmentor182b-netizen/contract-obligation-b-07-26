import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProfile } from '../api/settingsApi';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const data = await getProfile();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch global user data", error);
      toast.error("Failed to load user session data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refreshUser = () => {
    return fetchUserData();
  };

  const getInitials = () => {
    if (!userData) return 'U';
    const first = userData.first_name ? userData.first_name.charAt(0).toUpperCase() : '';
    const last = userData.last_name ? userData.last_name.charAt(0).toUpperCase() : '';
    return first + last || 'U';
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, isLoading, refreshUser, getInitials }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
