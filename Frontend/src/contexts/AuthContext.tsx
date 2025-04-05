'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'SOCIETY_HEAD' | 'COLLEGE_AUTHORITY' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: null
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);

  const login = (userRole: UserRole) => {
    const updatedUser = {
      ...mockUser,
      role: userRole
    };
    setIsAuthenticated(true);
    setRole(userRole);
    setUser(updatedUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        role,
        login,
        logout,
        updateUser
      }}
    >
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