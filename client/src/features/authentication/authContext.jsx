import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as authService from './authService';

const AuthContext = createContext(null);

/**
 * Wrap your app (or router) with <AuthProvider> once, near the root —
 * typically in App.jsx alongside any other top-level context providers.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while restoring session on load
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    authService.restoreSession().then((restoredUser) => {
      if (isMounted) {
        setUser(restoredUser);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const loggedInUser = await authService.loginUser(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials and try again.');
      throw err;
    }
  }, []);

  const register = useCallback(async (payload) => {
    setError(null);
    try {
      const newUser = await authService.registerUser(payload);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logoutUser();
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (allowedRoles) => authService.userHasRole(user, allowedRoles),
    [user]
  );

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Use inside any component under <AuthProvider> to access auth state/actions. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth() must be used inside an <AuthProvider>');
  }
  return ctx;
}
