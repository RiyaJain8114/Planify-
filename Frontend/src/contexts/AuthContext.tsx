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
  role: 'COLLEGE_AUTHORITY'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(mockUser);
  const [role, setRole] = useState<UserRole>(mockUser.role);

  const login = (userRole: UserRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
    setUser(prev => prev ? { ...prev, role: userRole } : mockUser);
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