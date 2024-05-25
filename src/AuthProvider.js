
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstLetter, setFirstLetter] = useState('');

  const login = (email) => {
    setIsLoggedIn(true);
    setFirstLetter(email.charAt(0).toUpperCase());
  };

  const logout = () => {
    setIsLoggedIn(false);
    setFirstLetter('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, firstLetter, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
