// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 const login = (username, password) => {
    // Here you would typically make an API call to authenticate the user
    // For simplicity, we're just setting the user directly
    setUser({ username, password });
 };

 const logout = () => {
    setUser(null);
 };

 return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
 );
};
