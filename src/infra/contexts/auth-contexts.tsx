import React, {
  createContext, useContext, useState,
} from 'react';

import { IUser } from '../models/IUser';
import { AuthService } from '../api/auth';

interface IAuthProviderProps {
  children: React.ReactNode
}

export interface LoginResponse {
  user: IUser;
  token: string;
}

interface IAuthContextProps {
  login(email: string, password: string): Promise<LoginResponse>;
  logout(): void;
  user: IUser | null;
  setUser(user: IUser): void;
  getCurrentUser(): Promise<IUser>;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const auth = await AuthService.login(email, password);

    localStorage.setItem('accessToken', auth.token);
    setUser(auth.user);

    return { user: auth.user, token: auth.token };
  };

  const logout = async () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    window.location.replace('/');
  };

  const getCurrentUser = async () => {
    const user = await AuthService.getCurrentUser();
    setUser(user);
    return user;
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      user,
      setUser,
      getCurrentUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
