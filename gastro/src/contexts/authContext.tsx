import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { id: string; email: string };

type AuthContextType = {
  user: User | null;
  token: string | null;
  role: string | null;
  setAuthData: (token: string, role: string, user: User) => Promise<void>;
  clearAuthData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredData = async () => {
      const [storedToken, storedUser, storedRole] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('role'),
      ]);

      if (storedToken && storedUser && storedRole) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setRole(storedRole);
      }
    };

    loadStoredData();
  }, []);

  const setAuthData = async (token: string, role: string, user: User) => {
    await clearAuthData();
    setToken(token);
    setRole(role);
    setUser(user);

    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('role', role);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const clearAuthData = async () => {
    setToken(null);
    setRole(null);
    setUser(null);

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, setAuthData, clearAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
};
