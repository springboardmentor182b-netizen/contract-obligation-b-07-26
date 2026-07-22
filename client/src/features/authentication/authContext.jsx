import React, { createContext, useState, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Create a custom hook so other components can easily use this context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the provider component that will wrap our app
export const AuthProvider = ({ children }) => {
  // By default, the user is NOT logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // In a real app, you would send this to your backend api here.
    // For now, we will just simulate a successful login.
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};