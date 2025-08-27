import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
const UserContext = createContext();



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {

      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false);   
        }

      } catch  {
        setUser(null);

      } finally {
        setLoading(false);
      }
    }
    verifyUser();
  }, [])

  const login = (user) => {
    setUser(user);
    localStorage.setItem('token', user.token); // optional
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useAuth = () => useContext(UserContext);

// Export provider
export default AuthProvider;
