import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
import { AdminUser } from '../types';

type AuthContextValue = {
  user: AdminUser | null;
  token: string | null;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) return;
    api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        setToken(null);
        localStorage.removeItem('token');
      });
  }, [token]);

  const login = async (loginValue: string, password: string): Promise<void> => {
    const res = await api.post('/auth/login', { login: loginValue, password });
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
