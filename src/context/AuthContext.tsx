import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    username: '',
    isAuthenticated: false,
  });
  const [adminPassword, setAdminPassword] = useState(ADMIN_CREDENTIALS.password);

  const login = (username: string, password: string) => {
    if (username === ADMIN_CREDENTIALS.username && password === adminPassword) {
      setUser({ username, isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser({ username: '', isAuthenticated: false });
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (currentPassword === adminPassword) {
      setAdminPassword(newPassword);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}