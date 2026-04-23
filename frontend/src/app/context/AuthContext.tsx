import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'nasabah' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'nasabah' | 'admin';
  phone?: string;
  address?: string;
  points?: number;
  roomNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'nasabah' | 'admin') => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'nasabah' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin MILOS',
    email: 'admin@milos.id',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Budi Santoso',
    email: 'budi@gmail.com',
    role: 'nasabah',
    phone: '081234567890',
    address: 'Kos Melati Kamar 12',
    roomNumber: '12',
    points: 12500,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'nasabah' | 'admin'): Promise<boolean> => {
    // Mock login - check if email exists and role matches
    const foundUser = mockUsers.find((u) => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      address: data.address,
      points: data.role === 'nasabah' ? 0 : undefined,
    };
    mockUsers.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
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