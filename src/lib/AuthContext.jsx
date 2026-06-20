import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_SESSION_KEY = 'bloom_admin_session';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth] = useState(false);
  const [isLoadingPublicSettings] = useState(false);
  const [authError] = useState(null);

  useEffect(() => {
    // Restore session from localStorage on mount
    try {
      const stored = localStorage.getItem(ADMIN_SESSION_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        setUser(session);
        setIsAuthenticated(true);
      }
    } catch (_) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  }, []);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      const session = { role: 'admin', email: 'admin@sheisthebest.com' };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      setUser(session);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    window.location.href = '/admin';
  };

  const checkAppState = () => {};
  const checkUserAuth = () => {};

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings: null,
      login,
      logout,
      navigateToLogin,
      checkAppState,
      checkUserAuth,
      authChecked: true,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
